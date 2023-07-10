import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { productKey } from './keys';

export type ProductDetailResponse = {
  id: number;
  sku: string;
  name: string;
  productStatus: null;
  description: string;
  priceId: number;
  originalPrice: number;
  hasFromToPrice: boolean;
  fromPrice: number;
  toPrice: number;
  promoteId: number;
  promotePrice: number;
  promotePercent: number;
  qty: number;
  productCategoryId: number;
  sharedUrl: string;
  productPoint: number;
  myOwnPoint: number;
  rewardExperiedDate: string;
  tagsList: [];
  productImage: {
    id: number;
    publicId: null;
    url: string;
    thumbnailPublicId: null;
    thumbnailUrl: string;
    miniUrl: string;
    isMain: true;
    productId: number;
    seqNo: number;
    product: null;
    createdDate: string;
    createdBy: number;
    updatedDate: null;
    updatedBy: null;
  }[];
  productClips: [];
  productPromotion: null;
  productCategory: {
    productCategoryId: number;
    subCategoryId: number;
    productCategoryName: string;
    url: string;
    isMainCategory: boolean;
  }[];
  variant: {
    variantId: number;
    name: string;
    serNo: number;
    variantValues: {
      message: null;
      ref: null;
      statusCode: number;
      url: null;
      valueId: number;
      valueName: string;
    }[];
  }[];
  skuValue: {
    bestBeforeDate: null;
    canPreOrder: boolean;
    expireDate: null;
    fixedAmount: number;
    fromPrice: number;
    hasFromToPrice: boolean;
    isShowLeftQty: boolean;
    isShowSoldQty: boolean;
    manufactureDate: null;
    memberPointEarn: number;
    originalPrice: number;
    point: number;
    productPreOrder: null;
    productSkuImages: {
      id: number;
      isMain: boolean;
      miniUrl: string;
      productId: number;
      skuId: number;
      thumbnailUrl: string;
      url: string;
      valueName: string;
      variantName: string;
    }[];
    promotePercent: number;
    promotePrice: number;
    purchasePrice: number;
    qty: number;
    rewardAmount: number;
    rewardPercent: number;
    skuId: number;
    soldQty: number;
    toPrice: number;
    value: string;
    weight: { amount: number; symbol: string; weightId: number };
    weightForCalculation: null;
  }[];
  variantValues: [];
  soldQty: number;
  leftQty: number;
  shippingInfo: null;
  returnPolicy: null;
  warranty: null;
  installation: null;
  brand: {
    id: number;
    name: string;
    logoUrl: string;
    url: number;
    logoUrl_Web: string;
    url_Web: string;
    description: string;
    facebookUrl: string;
    messengerUrl: string;
    serNo: number;
  };
  highLightMain: null;
  sizeChart: [];
  categorySteps: string[];
  memberPointEarn: number;
  isPreOrder: boolean;
  estFrom: null;
  estTo: null;
  isFav: boolean;
  colorCatalogId: number;
  variantIdForImage: number;
  isImageView: boolean;
  isAvailable: boolean;
  isGetOne: boolean;
  promotionGetOne: null;
  maxSerNo: number;
  promotionStartDate: string | null;
  promotionEndDate: string | null;
  promoteFromPrice: number | null;
  promoteToPrice: number | null;
  shopId: number;
  shop: {
    isAvailable: boolean;
    shopId: number;
    shopImageUrl: string;
    shopName: string;
  };
  isBestSelling: boolean;
  statusCode: number;
  message: null;
  ref: null;
};

export const useGetProductDetail = <TData = ProductDetailResponse>(
  productId: number,
  options?: UseQueryOptions<ProductDetailResponse, unknown, TData>
) => {
  return useQuery<ProductDetailResponse, unknown, TData>(
    productKey.productDetail(productId),
    async () => {
      return await apiClient
        .get('AYAZayProduct/GetProductDetailForAYA_v2', {
          params: {
            ProductId: productId,
          },
        })
        .then((res) => res.data);
    },
    options
  );
};
