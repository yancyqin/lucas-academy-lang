// lang.lucasacademy.org — static lesson pages from ./public, plus one endpoint:
//
//   GET /api/passage?translation=NIV&ref=1CO.13.1-4
//
// The Chinese text is public-domain CUV shipped with the lessons. The English
// (NIV) is licensed, so it is requested from YouVersion at read time — one
// upstream request per verse, because a range comes back as one unnumbered
// block that cannot be split apart reliably — and never stored in the repo.
// Only passages a lesson actually uses are served, at most seven verses at a
// time. The app key (YVP_APP_KEY) is a Worker secret and never reaches the
// browser.
import {PASSAGES, TRANSLATIONS, MAX_VERSES} from '../public/lessons/passages.js';

const YOUVERSION_API = 'https://api.youversion.com/v1';
const EDGE_TTL_SECONDS = 30 * 24 * 60 * 60;
const REF_PATTERN = /^([1-3]?[A-Z]{2,3})\.(\d{1,3})\.(\d{1,3})(?:-(\d{1,3}))?$/;

class RequestError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Licensed text stays out of the browser's persistent caches; the edge
      // cache below is what spares YouVersion repeat requests.
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  });
}

export function parseRef(ref) {
  const match = REF_PATTERN.exec(ref || '');
  if (!match) throw new RequestError(400, 'invalid_ref', 'That passage reference is not supported.');
  const [, book, chapterText, firstText, lastText] = match;
  const chapter = Number(chapterText);
  const first = Number(firstText);
  const last = Number(lastText ?? firstText);
  const allowed = PASSAGES[`${book}.${chapter}`];
  if (!allowed || first < allowed[0] || last > allowed[1] || last < first) {
    throw new RequestError(400, 'not_a_lesson', 'That passage is not part of a lesson here.');
  }
  if (last - first + 1 > MAX_VERSES) {
    throw new RequestError(400, 'range_too_wide', `Ask for at most ${MAX_VERSES} verses at a time.`);
  }
  return {book, chapter, first, last};
}

async function youVersion(path, key) {
  const response = await fetch(`${YOUVERSION_API}${path}`, {
    headers: {Accept: 'application/json', 'X-YVP-App-Key': key},
  });
  if (!response.ok) throw new RequestError(502, 'upstream_error', 'That passage could not be loaded. Please try again.');
  return response.json();
}

// Scripture text and version metadata do not change, so an edge-cache hit is
// the normal case. The cache key is a same-origin URL, as the Cache API needs.
async function cached(request, ctx, name, path, key) {
  const cache = caches.default;
  const cacheKey = new Request(new URL(`/__yv-cache/${name}`, request.url).toString(), {method: 'GET'});
  const hit = await cache.match(cacheKey);
  if (hit) return hit.json();
  const value = await youVersion(path, key);
  const stored = new Response(JSON.stringify(value), {
    headers: {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': `max-age=${EDGE_TTL_SECONDS}`},
  });
  ctx.waitUntil(cache.put(cacheKey, stored));
  return value;
}

export async function getPassage(request, env, ctx, translationKey, ref) {
  const translation = TRANSLATIONS[translationKey];
  if (!translation) throw new RequestError(400, 'invalid_translation', 'That Bible translation is not supported.');
  const {book, chapter, first, last} = parseRef(ref);
  if (!env.YVP_APP_KEY) throw new RequestError(503, 'not_configured', 'The English text is not configured on this server yet.');
  const key = env.YVP_APP_KEY;
  const id = translation.bibleId;

  const numbers = [];
  for (let n = first; n <= last; n += 1) numbers.push(n);
  const [metadata, ...verses] = await Promise.all([
    cached(request, ctx, `bible-${id}`, `/bibles/${id}`, key),
    ...numbers.map(n => cached(request, ctx, `passage-${id}-${book}.${chapter}.${n}`,
      `/bibles/${id}/passages/${book}.${chapter}.${n}?format=text&include_headings=false&include_notes=false`, key)),
  ]);
  const texts = verses.map(v => String(v?.content ?? '').trim());
  if (texts.some(text => !text)) throw new RequestError(502, 'upstream_error', 'That passage could not be loaded. Please try again.');

  return {
    ref,
    translation: {
      key: translation.key,
      abbreviation: metadata.abbreviation ?? translation.key,
      title: metadata.title ?? translation.key,
      copyright: metadata.copyright ?? '',
      youVersionDeepLink: metadata.youversion_deep_link ?? `https://www.bible.com/versions/${id}`,
    },
    verses: numbers.map((n, i) => ({n, text: texts[i]})),
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/passage') {
      if (request.method !== 'GET') return json({error: 'method_not_allowed'}, 405);
      try {
        return json(await getPassage(request, env, ctx,
          url.searchParams.get('translation') ?? 'NIV', url.searchParams.get('ref') ?? ''));
      } catch (error) {
        if (error instanceof RequestError) {
          if (error.status >= 500) console.error('passage', error.code);
          return json({error: error.code, message: error.message}, error.status);
        }
        console.error('passage', error);
        return json({error: 'passage_unavailable', message: 'That passage could not be loaded. Please try again.'}, 502);
      }
    }
    if (url.pathname.startsWith('/api/')) return json({error: 'not_found'}, 404);
    return env.ASSETS.fetch(request);
  },
};
