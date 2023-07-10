export const cartKeys = {
  cartDetail: () => ['AYAZayOrder', 'GetCartDetailForAYAZay'] as const,
  getCartDetailBuyNow: (productId: number, skuId: number, qty: number) =>
    [
      'AYAZayOrder',
      'GetCartDetailForBuyNowForAYAZay',
      productId,
      skuId,
      qty,
    ] as const,
  getOrderSetting: () => ['AYAZayOrder', 'GetOrderSettingDetail'] as const,
};
