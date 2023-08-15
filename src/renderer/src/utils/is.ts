export function isValidHttpUrl(httpUrl: string) {
  let url: URL;

  try {
    url = new URL(httpUrl);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
