import { ProductSearchOption } from '@/types';

export const productKey = {
  productSearchSuggestion: (query: string, shopId?: number, appId?: number) =>
    [
      'AYAZayProductSearch',
      'getProductSuggestion',
      query,
      shopId,
      appId,
    ] as const,
  productSearchHistory: (pageSize: number) =>
    ['AYAZayProductSearch', 'getSearchHistory', pageSize] as const,
  productSearchCategory: () => ['AYAZayProductSearch', 'getCategory'] as const,
  productSearchLists: (
    pageSize: number,
    searchType: number,
    searchOption: ProductSearchOption
  ) =>
    [
      'AYAZayProductSearch',
      'getProductLists',
      pageSize,
      searchType,
      searchOption,
    ] as const,
  productSearchHisoryDelete: () =>
    ['AYAZayProductSearch', 'getDeleteHistory'] as const,
};
