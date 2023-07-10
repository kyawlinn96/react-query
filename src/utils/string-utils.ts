export const insensitiveMatch = (value: string, filter: string) => {
  /**
   * Use cases
   * 1. filtering a list
   * 2. Text based search
   */
  return value
    .toLowerCase()
    .replace(/\s+/g, '')
    .includes(filter.toLowerCase().replace(/\s+/g, ''));
};
