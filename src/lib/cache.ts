import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DIR = path.resolve(".cache");

export async function cached<T>(
  key: string,
  fn: () => Promise<T>,
  ttl = 30 * 60_000, // 30 min
): Promise<T> {
  if (!import.meta.env.DEV) return fn(); // production builds always fetch fresh

  const file = path.join(
    DIR,
    crypto.createHash("md5").update(key).digest("hex") + ".json",
  );

  try {
    const { t, v } = JSON.parse(await fs.readFile(file, "utf8"));
    if (Date.now() - t < ttl) return v as T;
  } catch {} // no cache file yet

  const v = await fn();

  // don't cache empty results, since they usually mean a failed feed
  if (!(Array.isArray(v) && v.length === 0)) {
    await fs.mkdir(DIR, { recursive: true });
    await fs.writeFile(file, JSON.stringify({ t: Date.now(), v }));
  }
  return v;
}