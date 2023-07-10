export type BrandOfProductItems = {
  productId: number;
  url: string;
  name: string;
  originalPrice: number;
  promotePrice: number;
  promotePercent: number;
  createdDate: string;
  skuValueSize: number;
  leftQtyForFirstSkuValue: number;
  firstSkuValue: string;
  firstSkuId: number;
  isGetOne: boolean;
  promotionStartDate: null | string;
  promotionEndDate: null | string;
};

export type ProductByBrandResponse = {
  brandName: string;
  brandLogo: string;
  url: string;
  description: string;
  faceBookUrl: string;
  messengerUrl: string;
  total_Pages: number;
  total_Results: number;
  logoUrl_web: null;
  url_web: null;
  products: BrandOfProductItems[];
};
