import { CartItem, DeliveryInfo, PaymentInfo, ShopInfo } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CartState {
  totalAmt: number;
  netAmt: number;
  productInfo: CartItem[] | [];
  deliveryInfo: DeliveryInfo;
  deliveryFee: number;
  paymentInfo: PaymentInfo | {};
  shopInfo: ShopInfo[];
  showRemoveProductModal: {
    show: boolean;
    product: CartItem | null;
  };
  isBuyNow: boolean;
  setTotalAmt: (payload: number) => void;
  setNetAmt: (payload: number) => void;
  setProductInfo: (payload: CartItem[]) => void;
  setDeliveryInfo: (payload: DeliveryInfo) => void;
  setDeliveryFee: (payload: number) => void;
  setPaymentInfo: (payload: PaymentInfo) => void;
  setShopInfo: (payload: ShopInfo[]) => void;
  addQty: (productId: number) => void;
  removeQty: (productId: number) => void;
  removeProduct: (productId: number) => void;
  setShowRemoveProductModal: (product: CartItem | null) => void;
  setIsBuyNow: (payload: boolean) => void;
}

const useCartStore = create<CartState>()(
  devtools((set) => ({
    totalAmt: 0,
    netAmt: 0,
    productInfo: [],
    deliveryInfo: {
      deliveryServiceId: 0,
      cityId: 0,
      townshipId: 0,
      cityName: '',
      townshipName: '',
      areaInfo: '',
      fromEstDeliveryDay: 0,
      toEstDeliveryDay: 0,
      deliveryAmt: 0,
      userId: 0,
      name: '',
      address: '',
      landmark: '',
      phoNo: '',
      labelName: '',
      remark: '',
      mainDeliveryService: [],
      otherOptionService: null,
      deliveryDate: null,
      deliveryFromTime: null,
      deliveryToTime: null,
      isPhoneNoVerified: false,
    },
    deliveryFee: 0,
    paymentInfo: {},
    shopInfo: [],
    showRemoveProductModal: { show: false, product: null },
    isBuyNow: false,
    setTotalAmt(payload) {
      set(() => ({ totalAmt: payload }));
    },
    setNetAmt(payload) {
      set(() => ({ netAmt: payload }));
    },
    setProductInfo(payload) {
      set(() => ({ productInfo: payload }));
    },
    setDeliveryInfo(payload) {
      set(() => ({ deliveryInfo: payload }));
    },
    setDeliveryFee(payload) {
      set(() => ({ deliveryFee: payload }));
    },
    setPaymentInfo(payload) {
      set(() => ({ paymentInfo: payload }));
    },
    setShopInfo(payload) {
      set(() => ({ shopInfo: payload }));
    },
    addQty(productId) {
      set((state) => {
        const updatedProductInfo = state.productInfo.map((product) => {
          if (product.productId === productId) {
            return { ...product, qty: product.qty + 1 };
          }
          return product;
        });
        return { ...state, productInfo: updatedProductInfo };
      });
    },
    removeQty(productId) {
      set((state) => {
        const updatedProductInfo = state.productInfo.map((product) => {
          if (product.productId === productId) {
            if (product.qty <= 1) return product;
            return { ...product, qty: product.qty - 1 };
          }
          return product;
        });
        return { ...state, productInfo: updatedProductInfo };
      });
    },
    removeProduct(productId) {
      set((state) => {
        const updatedProductInfo = state.productInfo.filter(
          (product) => product.productId !== productId
        );
        return { ...state, productInfo: updatedProductInfo };
      });
    },
    setShowRemoveProductModal(product) {
      set(() => {
        if (product?.productId) {
          return { showRemoveProductModal: { show: true, product } };
        }
        return { showRemoveProductModal: { show: false, product: null } };
      });
    },
    setIsBuyNow(payload) {
      set(() => ({ isBuyNow: payload }));
    },
  }))
);

export default useCartStore;
