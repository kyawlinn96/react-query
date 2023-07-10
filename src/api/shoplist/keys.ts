export const shoplistKeys = {
  shopList: (shopName: string, followStatusFilter: boolean, pageSize: number) =>
    [
      'AYAZayShopListCotroller',
      'GetShopListBuyer',
      shopName,
      followStatusFilter,
      pageSize,
    ] as const,
};
