// Everything is kept on this device only, under its own prefix so it never
// mixes with the Chinese reader's keys. Storage can be off (private windows,
// some iPad settings): reads fall back, writes fail quietly.
const PREFIX = 'lucas-lang.';

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw) ?? fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    // Nothing stored.
  }
}

export const storageKey = key => PREFIX + key;
