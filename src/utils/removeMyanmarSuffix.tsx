export function removeMyanmarSuffix<T extends string | null | undefined>(
  str: T
): T {
  if (!str) {
    return str;
  }

  const suffixRegex = /\s?\([^()]*\)/g;
  return str.replace(suffixRegex, '').trim() as T;
}
