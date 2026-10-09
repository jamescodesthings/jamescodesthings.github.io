// localStorage that never throws. Safari private mode, blocked site data and quota errors all land on the
// fallback (get) or false (set), so callers keep their own in-memory state and carry on.
export function createStorage(win = globalThis) {
  return {
    get(key, fallback = null) {
      try {
        const value = win.localStorage.getItem(key);
        return value === null || value === undefined ? fallback : value;
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        win.localStorage.setItem(key, String(value));
        return true;
      } catch (e) {
        return false;
      }
    },
  };
}

export const storage = createStorage();
export const get = storage.get;
export const set = storage.set;
