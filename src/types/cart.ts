export interface CartItem {
  productId: number;
  productUrl: string;
  productTypeId: number;
  skuId: number;
  name: string;
  price: number;
  promotePrice: number;
  variation: string;
  qty: number;
  availableQty: number;
  isShopAvailable: boolean;
  isGetOne: boolean;
  promotionGetOne: null | {};
  weight: {
    amount: number;
    symbol: string;
    weightId: number;
  };
  weightForCalculation: {
    amount: number;
    symbol: string;
    weightId: number;
  };
  hasFromToPrice: false;
  fromPrice: number;
  toPrice: number;
  total: number;
  discount: number;
  promoteFromPrice: null | number;
  promoteToPrice: null | number;
  pointRateForPriceDefine: null | number;
  promotionStartDate: null | number;
  promotionEndDate: null | number;
  promotePercent: number;
  shopId: number;
}

export interface DeliveryInfo {
  deliveryServiceId: number;
  cityId: number;
  townshipId: number;
  cityName: string;
  townshipName: string;
  areaInfo: string;
  fromEstDeliveryDay: number;
  toEstDeliveryDay: number;
  deliveryAmt: number;
  userId: number;
  name: string;
  labelName: string;
  address: string;
  landmark: string;
  phoNo: string;
  remark: string;
  mainDeliveryService: [];
  otherOptionService: null;
  deliveryDate: null;
  deliveryFromTime: null;
  deliveryToTime: null;
  isPhoneNoVerified: boolean;
}

export interface ShopInfo {
  shopId: number;
  shopName: string;
  shopImageUrl: string;
}

export type CartDetailResponse = {
  totalAmt: number;
  deliveryFee: number;
  netAmt: number;
  isShowDelivery: boolean;
  productInfo: CartItem[];
  shopInfo: ShopInfo[];
  deliveryInfo: DeliveryInfo;
  productIssues: [];
  totalAmtForFreeDeli: number;
  isPromotion: boolean;
  weightFeeInfo: {
    weightLimit: number;
    feePerUnit: number;
    totalWeightInKg: number;
    finalWeightInKg: number;
    finalWeightFee: number;
    symbol: string;
  };
  isMemberpoint: boolean;
  isChargesForExtraWeight: boolean;
  isIncludeFromToPriceProduct: boolean;
  isFreeDelivery: boolean;
  discountTotal: number;
  userId: number;
  userName: null;
  userUrl: null;
  userPhoneNo: null;
  statusCode: number;
  message: null;
  ref: null;
};

export type UpdateProductCartVars = {
  productCarts: {
    productId: number;
    skuId: number;
    qty: number;
  }[];
};

export type PostOrderVars = {
  totalAmt: number;
  netAmt: number;
  deliveryFee: number;
  userPhoneNo: string;
  serviceCode: number;
  isChargesForExtraWeight: boolean;
  platform: number;
  handlingFee: number;
  tax: number;
  discountPrice: number;
  discountPercent: number;
  isSeller: boolean;
  productInfo: {
    productId: number;
    skuId: number;
    price: number;
    qty: number;
    point: number;
    shopId: number;
  }[];
  deliveryInfo: {
    name: string;
    cityId: number;
    townshipId: number;
    phoNo: string;
    address: string;
    landMark: string;
    remark: string;
    deliveryDate: string;
    fromTime: number;
    toTime: number;
    selectedDeliveryInfo: {
      id: number;
      isMain: boolean;
      deliveryServiceId: number;
      deliveryServiceName: string;
      deliveryServiceEmail: string;
      deliveryServicePhno: string;
      logoPath: string;
      deliveryFee: number;
      fromEstDeliveryDay: number;
      toEstDeliveryDay: number;
    };
  };
  paymentInfo: {
    paymentServiceId: number;
    bankId: number;
    phoNo: string;
    remark: string;
    approvalImage: {
      approvalImage: string;
      approvalImageExtension: string;
    }[];
  };
  isIncludeFromToPriceProduct: boolean;
  isFreeDelivery: boolean;
  postOrderTypeId: number;
};
