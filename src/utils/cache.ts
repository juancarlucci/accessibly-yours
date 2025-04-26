export function getFromCache<T>(key: string, maxAgeDays: number): T | null {
  if (typeof window === "undefined") return null; // SSR safety

  const cached = localStorage.getItem(key);
  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    const ageMs = Date.now() - parsed.timestamp;
    const ageDays = ageMs / (1000 * 60 * 60 * 24);

    if (ageDays < maxAgeDays) {
      return parsed.data as T;
    } else {
      console.log(`[Cache Expired] ${key}`);
      return null;
    }
  } catch (err) {
    console.error("Error parsing cache for key:", key, err);
    return null;
  }
}
