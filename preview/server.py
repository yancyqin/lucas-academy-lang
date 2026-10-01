"""Local review server. Only preview/design files and allowlisted passage requests.
Uses the existing reader's local YouVersion configuration; no secrets copied.
NIV payloads pass through in memory and are never written into this project.
"""
import functools
import json
import os
import re
from concurrent.futures import ThreadPoolExecutor
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).resolve().parent.parent
ALLOWED = {"1CO.13": (1, 13), "MRK.4": (1, 9)}
CONFIG = ROOT.parent / "lucas-academy-chinese" / ".dev.vars"
API = "https://api.youversion.com/v1"
SESSION_CACHE = {}

def upstream(path):
    if path in SESSION_CACHE:
        return SESSION_CACHE[path]
    match = re.search(r'^\s*YVP_APP_KEY\s*=\s*(.+?)\s*$', CONFIG.read_text(), re.M)
    if not match:
        raise ValueError("Existing YouVersion configuration is unavailable")
    key = match.group(1).strip().strip('\"\'')
    request = Request(API + path, headers={"Accept": "application/json", "X-YVP-App-Key": key})
    with urlopen(request, timeout=30) as response:
        data = json.load(response)
    SESSION_CACHE[path] = data
    return data

def get_passage(ref, book, start, end):
    metadata = upstream("/bibles/111")
    numbers = list(range(start, end + 1))
    def verse(n):
        value = upstream(f"/bibles/111/passages/{book}.{n}?format=text&include_headings=false&include_notes=false")
        if not value.get("content"):
            raise ValueError("Verse unavailable")
        return {"n": n, "text": str(value["content"]).strip()}
    with ThreadPoolExecutor(max_workers=5) as pool:
        verses = list(pool.map(verse, numbers))
    return {"ref": ref, "verses": verses, "translation": {
        "key": "NIV", "abbreviation": metadata.get("abbreviation", "NIV"),
        "title": metadata.get("title", "New International Version"),
        "copyright": metadata.get("copyright", ""),
        "youVersionDeepLink": metadata.get("youversion_deep_link", "https://www.bible.com/versions/111")
    }}

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def do_GET(self):
        url = urlparse(self.path)
        if url.path == "/api/passage":
            params = parse_qs(url.query)
            ref = params.get("ref", [""])[0]
            match = re.fullmatch(r"(1CO\.13|MRK\.4)\.(\d+)(?:-(\d+))?", ref)
            if not match:
                self.send_error(400, "Unsupported preview passage")
                return
            book, start, end = match.group(1), int(match.group(2)), int(match.group(3) or match.group(2))
            lo, hi = ALLOWED[book]
            if not (lo <= start <= end <= hi and end - start < 7):
                self.send_error(400, "Choose up to seven verses")
                return
            try:
                payload = json.dumps(get_passage(ref, book, start, end), ensure_ascii=False).encode()
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(payload)
            except (HTTPError, URLError, TimeoutError, ValueError, OSError):
                self.send_response(502)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"error":"passage_unavailable"}')
            return
        if url.path == "/":
            self.send_response(302)
            self.send_header("Location", "/preview/")
            self.end_headers()
            return
        if not (url.path.startswith("/preview/") or url.path.startswith("/design/")):
            self.send_error(404)
            return
        resolved = Path(self.translate_path(url.path)).resolve()
        permitted = any(resolved.is_relative_to(ROOT / area) for area in ("preview", "design"))
        if not permitted or any(part.startswith('.') for part in resolved.relative_to(ROOT).parts) or resolved.suffix in {".py", ".pyc"}:
            self.send_error(404)
            return
        super().do_GET()

    def list_directory(self, path):
        self.send_error(404)
        return None

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8095"))
    host = os.environ.get("HOST", "0.0.0.0")
    server = ThreadingHTTPServer((host, port), functools.partial(Handler, directory=str(ROOT)))
    print(f"Reciprocal Doors preview: http://{host}:{port}/preview/", flush=True)
    server.serve_forever()
