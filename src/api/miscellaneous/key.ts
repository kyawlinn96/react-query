export const miscellaneousKeys = {
  getCategoryDetails: () =>
    ['AYAZayMiscellaneous', 'GetCategoryDetail'] as const,
  getShopNameSuggestionBuyer: (pageNumber: number, pageSize: number) =>
    [
      'AYAZayMiscellaneous',
      'GetShopNameSuggestionBuyer',
      pageNumber,
      pageSize,
    ] as const,
  getShopNameSuggestionSeller: (search: string, pageSize: number) =>
    [
      'AYAZayMiscellaneous',
      'GetShopNameSuggestionSeller',
      search,
      pageSize,
    ] as const,
  getCity: () => ['Miscellaneous', 'GetCity'] as const,
  getTownship: (cityId: number) =>
    ['Miscellaneous', 'GetTownship', cityId] as const,
};
