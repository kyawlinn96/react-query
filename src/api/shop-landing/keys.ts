export const shopLandingKeys = {
  shopPromotion: (pageSize: number) =>
    ['AYAZayShopLanding', 'GetPromotionByShopId', pageSize] as const,
  shopProduct: (pageSize: number, sortBy?: number) =>
    ['AYAZayShopLanding', 'GetProductByShopId', pageSize, sortBy] as const,
  shopCategory: (shopId: number) =>
    ['AYAZayShopLanding', 'GetCategoryByShopId', shopId] as const,
  shopDetail: (shopId: number) =>
    ['AYAZayShopLanding', 'GetDetailByShopId', shopId] as const,
  shopBranches: (pageSize: number) =>
    ['AYAZayShopLanding', 'GetBranchesByShopId', pageSize] as const,
  shopBrand: (pageSize: number) =>
    ['AYAZayShopLanding', 'GetBrandByShopId', pageSize] as const,
};
