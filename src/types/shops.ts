export interface ProductItem {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  createdDate: string;
}
export type ProductByShopResponse = {
  products: ProductItem[];
  statusCode: number;
  totalItem: number;
  pageItem: number;
  pageNumber: number;
  message: string;
  ref: null;
};
export type PromotionByShopResponse = {
  shopId: number;
  promoProducts: {
    productId: number;
    imageUrl: string;
    productName: string;
    normalPrice: number;
    promotionPrice: number;
    promotionPercent: number;
  }[];
  totalItem: number;
  pageItem: number;
  pageSize: number;
  statusCode: number;
  message: string;
  ref: null;
};
type SubCategory2 = {
  id: number;
  name: string;
  url: string;
};

type SubCategory1 = {
  id: number;
  name: string;
  url: string;
  subCategory2: SubCategory2[];
};
export type MainCategory = {
  id: number;
  productCategoryId: number;
  name: string;
  description: string;
  url: string;
  backgroundUrl: string;
  subCategory1: SubCategory1[];
};
export type CategoryByShopResponse = {
  shopId: number;
  totalItem: number;
  mainCategory: MainCategory[];
  statusCode: number;
  message: string;
  ref: null;
};
export type ShopDetailByShopResponse = {
  shopId: number;
  backGroundImgUrl: string;
  shopImageUrl: string;
  shopName: string;
  shopType: string;
  cityId: number;
  townshipId: number;
  cityName: string;
  townshipName: string;
  phoneNo: string;
  isShopAviable: boolean;
  followerCount: number;
  followerProfileList: {
    userId: number;
    url: string;
  }[];
  isFollowed: boolean;
  statusCode?: number;
  message?: string;
  ref?: null;
};

export type BranchesByShopResponse = {
  branches: {
    id: number;
    name: string;
    mobileNumber: string;
    cityId: number;
    townshipId: number;
    cityName: string;
    townShipName: string;
    address: string;
    email?: string | null;
    isMainShop: boolean;
  }[];
  pageItems: number;
  pageNumber: number;
  statusCode: number;
  message: string;
  ref: null;
};

export type BrandByShopResponse = {
  shopId: number;
  brands: {
    brandId: number;
    brandName: string;
    logoUrl: string;
    url: string;
  }[];
  totalItem: number;
  pageNumber: number;
  statusCode: number;
  message: string;
  ref: null;
};
