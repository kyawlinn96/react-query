import { ProductDetailResponse } from '@/api/product-detail/product-detail-query';
import { ProductVariantValue } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ProductDetailStore {
  product: ProductDetailResponse | null;
  setProduct: (payload: ProductDetailResponse) => void;
  relatedProducts: any[];
  selectedVariants: ProductVariantValue[];
  isDefaultVariant: boolean;
  showDialogBox: boolean;
  setShowDialogBox: (show: boolean) => void;
  isShowVariantBox: boolean;
  setIsShowVariantBox: (show: boolean) => void;
  productImage: string | undefined;
  qty: number;
  addQty: () => void;
  reduceQty: () => void;
  handleAddOrBuyNow: (checkVariant: boolean, isBuyNow: boolean) => void;
  handleSelectedVariantChg: (
    index: number,
    variantValue: ProductVariantValue
  ) => void;
}

export const useProductDetailStore = create<ProductDetailStore>()(
  devtools((set) => ({
    product: null,
    setProduct: (payload) => {
      set(() => ({
        product: payload,
      }));
    },
    relatedProducts: [],
    selectedVariants: [],
    isDefaultVariant: false,
    showDialogBox: false,
    setShowDialogBox: (show) => set({ showDialogBox: show }),
    isShowVariantBox: false,
    setIsShowVariantBox: (show) => set({ isShowVariantBox: show }),
    productImage: undefined,
    qty: 1,
    addQty: () => set((state) => ({ qty: state.qty + 1 })),
    reduceQty: () => set((state) => ({ qty: state.qty - 1 })),
    handleAddOrBuyNow: (checkVariant, isBuyNow) => {
      // Your implementation here
    },
    handleSelectedVariantChg: (index, variantValue) => {
      set((state) => {
        const selectedVariants = [...state.selectedVariants];
        selectedVariants[index] = variantValue;
        return { selectedVariants };
      });
    },
  }))
);
