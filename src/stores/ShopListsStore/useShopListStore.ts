// import { ShopDetailProps } from "@/api/shopdetail/shop-detail-query";
import { create } from 'zustand';
interface ShopListProps {
  selectShopId: number;
}

export const useShopListsStore = create<ShopListProps>((set) => ({
  selectShopId: 1,
}));
