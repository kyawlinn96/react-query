export type suggestItem = {
  id: number;
  imageUrl: string;
  name: string;
};
export interface product {
  productId?: number;
  url?: string;
  price?: number;
  rewardPoint?: number;
  name?: string;
  originalPrice?: number;
  promotePrice?: number | null;
  promotePercent?: number;
  createdDate?: string;
  isFav?: boolean;
  isGetOne?: boolean;
  fromPrice?: number;
  toPrice?: number;
  hasFromToPrice?: boolean;
  promoteFromPrice?: null;
  promoteToPrice?: null;
  totalWishList?: number;
  totalOrder?: number;
  skuValueSize?: number;
  leftQtyForFirstSkuValue?: number;
  firstSkuValue?: number | string;
  firstSkuId?: number;
  rating?: number;
  ratingCount?: number;
}

export interface svgIcon {
  width: number;
  height: number;
  fill_one?: string;
  fill_two?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  url: string;
  backgroundUrl: string | null;
  subCategory: SubCategory[];
  statusCode: number;
  message: string | null;
  ref: string | null;
}

export interface SubCategory {
  id: number;
  name: string;
  description: string | null;
  url: string;
  mainCategoryId: number;
  statusCode: number;
  message: string | null;
  ref: string | null;
}

export interface PromoProductProps {
  productId: number;
  imageUrl: string;
  productName: string;
  normalPrice: number;
  promotionPrice: number;
  promotionPercent: number;
}
