export interface WishListsProps {
  productId: number;
  url: string;
  name: string;
  originalPrice: number;
  promotePrice: number;
  promotePercent: number;
  hasFromToPrice: boolean;
  fromPrice: number;
  toPrice: number;
  isFav: boolean;
  isGetOne: boolean;
  skuValueSize: number;
  leftQtyForFirstSkuValue: number;
  firstSkuValue: string;
  firstSkuId: number;
  whishListDate: string;
  totalWishList: number;
  totalOrder: number;
  promoteFromPrice: number | null;
  promoteToPrice: number | null;
}
