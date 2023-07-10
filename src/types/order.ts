import { DeliveryInfo, ShopInfo } from './cart';

export interface OrderItem {
  id: number;
  fixedAmount: number;
  fromPrice: null;
  hasFromToPrice: null;
  isGetOne: false;
  name: string;
  originalPrice: number;
  promoteFromPrice: null;
  promotePercent: number;
  promotePrice: number;
  promoteToPrice: null;
  promotionEndDate: null;
  promotionGetOne: null;
  promotionStartDate: null;
  qty: number;
  sku: string;
  skuId: number;
  skuValue: string;
  toPrice: null;
  url: string;
  variantName: string[];
  weight: {
    amount: number;
    symbol: string;
    weightId: number;
  } | null;
  weightForCalculation: null;
  shopId: number;
}

export interface PaymentInfo {
  paymentServiceId: number;
  bankId: number;
  phoNo: string;
  remark: string;
  approvalImage: {
    approvalImage: string;
    approvalImageExtension: string;
  };
}

export interface OrderDeliveryInfo {
  address: string;
  cityId: number;
  cityName: string;
  townShipId: number;
  townShipName: string;
  landMark: string;
  phNo: string;
  deliveryService: {
    id: number;
    name: string;
    phNo: string;
    imgPath: string;
    serviceAmount: number;
    fromEstDeliveryDay: number;
    toEstDeliveryDay: number;
  };
}

export interface OrderWeightInfo {
  totalWeight: number;
  finalWeightFee: number;
  weightLimit: number;
  feePerUnit: number;
}

export interface OrderDetailResponse {
  orderId: number;
  voucherNo: string;
  orderDate: string;
  isProductReward: false;
  totalAmt: number;
  deliveryFee: number;
  netAmt: number;
  tax: number;
  discountPrice: number;
  discountPercent: number;
  isDeleted: boolean;
  userId: number;
  userName: string;
  userUrl: null;
  userPhoneNo: string;
  email: null;
  isActive: boolean;
  orderStatus: { id: number; name: string };
  orderCancelStatus: {
    id: number;
    name: string;
  };
  orderItem: OrderItem[];
  deliveryInfo: OrderDeliveryInfo;
  paymentInfo: [
    {
      id: number;
      transactionDate: string;
      phoneNo: string;
      createdDate: string;
      autoPaymentInvoiceNumber: null;
    }
  ];
  isFreeDelivery: false;
  weight: OrderWeightInfo;
  sellerOrderConfirmRemark: null;
  unSeenCount: number;
  deliFeeChargesOnOrderEditor: false;
  isChargesForExtraWeight: false;
  shopInfo: ShopInfo[];
}

export interface OrderHistoryResponse {
  orderId: number;
  voucherNo: string;
  userName: string | null;
  productUrl: string;
  isGetOne: boolean;
  price: number;
  qty: number;
  orderStatusId: number;
  orderStatus: string;
  orderDate: string;
  paymentStatusId: number;
  paymentStatusName: string;
  paymentDate: string;
  createdDate: string;
  paymentServiceImgPath: string;
  totalCount: number;
  totalPoint: number;
  orderDescription: string;
}

export interface GetVoucherResponse {
  shopName: string;
  address: string;
  phoneNo: string;
  voucherNo: string;
  taxplayerId: number;
  orderId: number;
  orderDate: string;
  counter: null;
  cashier: string;
  totalAmount: number;
  discount: number;
  deliveryAmount: number;
  commercialTax: number;
  netAmount: number;
  changed: 0.0;
  itemList: {
    productId: number;
    originalPrice: number;
    promotePrice: number;
    promotePercent: number;
    qty: number;
    name: string;
    skuId: number;
    sku: string;
    price: number;
    weight: {
      amount: number;
      symbol: string;
      weightId: number;
    };
  }[];
  qrCode: string;
  handlingFee: number;
  tax: number;
  discountPriceByTotal: number;
  discountPercentByTotal: number;
  isFreeDelivery: boolean;
  weightFeeInfo: {
    weightLimit: number;
    feePerUnit: number;
    totalWeightInKg: number;
    finalWeightInKg: number;
    finalWeightFee: number;
    symbol: string;
  };
  buyerName: string;
  buyerPhoneNo: string;
  buyerAddress: string;
}
