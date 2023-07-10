export const brandKey = {
  getProductByBrandId: (pageSize: number) =>
    ['AYAZayBrand', 'GetProductByBrand', pageSize] as const,
  getBrandByAlphabet: (pageSize: number, searchParam: string) =>
    ['AYAZayBrand', 'GetBrandByAlphabet', pageSize, searchParam] as const,
  getBrandByName: (pageSize: number, brandName: string) =>
    ['AYAZayBrand', 'GetBrandByName', pageSize, brandName] as const,
};
