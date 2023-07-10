export type ProductSearchHistoryResponse = {
  searchHistories: HistoryItemsProps[];
  statusCode: number;
  message: string;
  ref: null;
};
export type HistoryItemsProps = {
  id: number;
  searchText: number;
  createdDate: string;
  imageUrl: string | null;
};

export type CategoryByProductSearchResponse = {
  mainCategories: {
    id: number;
    name: string;
    url: string;
  }[];
  statusCode: number;
  message: string;
  ref: null;
};

export type ProductInfo = {
  id: number;
  name: string;
  sku: string;
  originalPrice: number;
  promotePrice: number;
  promotePercent: number;
  qty: number;
  createdDate: string;
  orderCount: number;
  url: string;
  isGetOne: boolean;
  isFav: boolean;
  skuValueSize: number;
  leftQtyForFirstSkuValue: number;
  firstSkuValue: string;
  firstSkuId: number;
  orderBy: number;
  fromPrice: number;
  toPrice: number;
  hasFromToPrice: boolean;
  promoteFromPrice: number | null;
  promoteToPrice: number | null;
  promotionStartDate: string | null;
  promotionEndDate: string | null;
  brandId: number | null;
  isForSale: boolean | null;
  totalWishList: number;
  totalOrder: number;
};
export type ProductsLists = {
  productList: ProductInfo[];
  count: number;
  categoryStep: string;
  bgUrl: string | null;
  message?: string;
};

export type ProductSearchOption = {
  choose?: number | null;
  productCategoryId?: number | string;
  productName?: string;
  // tagLists?: string[];
};

export enum SearchType {
  SEARCH_BY_NAME = 1,
  SEARCH_BY_CATEGORY = 2,
  SEARCH_TAG = 3,
  SEARCH_LATEST = 4,
  SEARCH_PROMOTION = 5,
  SEARCH_SUB_CATEGORY = 6,
  SEARCH_BEST_SELLING = 7,
  SEARCH_BUY_ONE_GET_ONE = 9,
  SEARCH_POPULAR_PRODUCTS = 10,
  SEARCH_ALL_PRODUCTS = 18,
}

export enum SortType {
  DEFAULT,
  LOW_TO_HIGH,
  HIGH_TO_LOW,
  LATEST,
  BEST_SELLING,
}
