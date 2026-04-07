export function normalizeKeyword(keyword?: string): string {
  if (!keyword) {
    return "";
  }

  return keyword.trim().replace(/\s+/g, " ").toLowerCase();
}

export function matchesKeyword(text: string, keyword?: string): boolean {
  const normalizedKeyword = normalizeKeyword(keyword);
  if (!normalizedKeyword) {
    return true;
  }

  return normalizeKeyword(text).includes(normalizedKeyword);
}
