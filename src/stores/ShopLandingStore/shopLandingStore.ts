import { ShopDetailByShopResponse } from '@/types';
import { create } from 'zustand';
interface StoreShopLandingProps {
  shopDetail: ShopDetailByShopResponse | null;
  sortedValue: number;
  setCurrShopDetail: (newDetail: ShopDetailByShopResponse) => void;
  setCurrSortValue: (sortValue: number) => void;
}

export const useShopLandingStore = create<StoreShopLandingProps>((set) => ({
  shopDetail: null,
  sortedValue: 1,
  setCurrShopDetail: (newDetail) => set((state) => ({ shopDetail: newDetail })),
  setCurrSortValue: (sortValue) => set((state) => ({ sortedValue: sortValue })),
}));
