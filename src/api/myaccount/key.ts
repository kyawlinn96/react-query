export const myAccountKeys = {
  getWishLists: () => ['AYAZayMyAccount', 'GetProductWishLists'] as const,
  updateWishList: (productId: number) =>
    ['AYAZayMyAccount', 'UpdateWishList', productId] as const,
};
