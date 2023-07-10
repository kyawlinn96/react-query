export const homeKeys = {
  bannerAndCategory: (bannerType?: number, isWeb?: number) =>
    [
      'AYAZayProduct',
      'GetLandingBannerAndCategory',
      bannerType,
      isWeb,
    ] as const,
  productCardList: (pageNumber?: number, pageSize?: number) =>
    [
      'AYAZayProduct',
      'GetLandingProductCardList',
      pageNumber,
      pageSize,
    ] as const,
  productOfferList: (pageNumber?: number, pageSize?: number) =>
    ['AYAZayProduct', 'GetLandingProductOffer', pageNumber, pageSize] as const,
  brandAndCategory: (pageNumber?: number, pageSize?: number) =>
    ['AYAZayProduct', 'GetLandingBrandCategory', pageNumber, pageSize] as const,
  popularShops: (
    shopName?: string,
    followStatusFilter?: boolean,
    pageNumber?: number,
    pageSize?: number
  ) =>
    [
      'AYAZayShopListCotroller',
      'GetShopListBuyer',
      'PopularShops',
      shopName,
      followStatusFilter,
      pageNumber,
      pageSize,
    ] as const,
  justForYouProducts: (pageNumber?: number, pageSize?: number) =>
    [
      'AYAZayProduct',
      'GetLandingJustForYouProduct',
      pageNumber,
      pageSize,
    ] as const,
};
