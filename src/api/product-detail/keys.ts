export const productKey = {
  productDetail: (productId: number) =>
    ['AYAZayProduct', 'GetProductDetailForAYA_v2', productId] as const,
  relatedProduct: (categoryId: number | undefined, productId: number) =>
    [
      'AYAZayProduct',
      'GetProductByRelatedCategry',
      categoryId,
      productId,
    ] as const,
};
