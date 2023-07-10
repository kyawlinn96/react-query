import {
  CategoryByProductSearchResponse,
  CategoryByShopResponse,
} from '@/types';
import { create } from 'zustand';
interface StoreSearchProductsProps {
  productSearchCategory: CategoryByProductSearchResponse | null;
  productSearchCategoryByShop: CategoryByShopResponse | null;
  setProductSearchCategory: (
    productCategory: CategoryByProductSearchResponse
  ) => void;
  setProdcutSearchCategoryByShop: (
    productCategoryByShop: CategoryByShopResponse
  ) => void;
  productName: string;
  sortOption: number;
  setProductName: (newName: string) => void;
  setSortOption: (newSortValue: number) => void;
}

export const useProductSearchStore = create<StoreSearchProductsProps>(
  (set) => ({
    productName: '',
    sortOption: 0,
    productSearchCategory: null,
    productSearchCategoryByShop: null,
    setProductSearchCategory: (prodcutCategory) =>
      set((state) => ({ productSearchCategory: prodcutCategory })),
    setProdcutSearchCategoryByShop: (productCategoryByShop) =>
      set((state) => ({ productSearchCategoryByShop: productCategoryByShop })),
    setProductName: (newName) =>
      set((state) => ({
        productName: newName,
      })),
    setSortOption: (newSortValue) =>
      set((state) => ({ sortOption: newSortValue })),
  })
);
