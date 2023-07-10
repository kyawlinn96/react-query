import React from 'react';
import HistoryItems from '@/components/ProductSearch/History/HistoryItems';
import { useGetSearchHistoryDelete } from '@/api/products/product-search-history-delete-query';
import { useGetProductSearchHistory } from '@/api/products/product-search-history-query';
import {
  HistoryItemsProps,
  SearchType,
  ShopDetailByShopResponse,
  SortType,
} from '@/types';
import { useNavigate } from 'react-router-dom';
interface HistoryProps {
  shopData: ShopDetailByShopResponse;
}
const History: React.FC<HistoryProps> = ({ shopData }) => {
  const navigate = useNavigate();
  const { mutate: shopHistoryDelete } = useGetSearchHistoryDelete();
  const { data: historyData } = useGetProductSearchHistory(
    10,
    shopData?.shopId
  );

  const removeSearchHistory = (data: any) => {
    shopHistoryDelete(data);
  };
  const searchByHistoryItem = (data: HistoryItemsProps) => {
    let propsState = {
      searchType: SearchType.SEARCH_BY_NAME,
      sortedValue: SortType.DEFAULT,
      productName: data.searchText,
      shopData: shopData || null,
    };
    navigate('/resultproducts', { state: propsState });
  };
  return (
    <>
      {historyData?.searchHistories?.length! > 0 ? (
        <>
          <div className='flex items-center justify-between'>
            <h3 className='text-md font-semibold'>Recent Search</h3>
            <button
              className='text-[14px] font-medium'
              onClick={() =>
                removeSearchHistory({
                  id: 0,
                  isClearAll: true,
                  shopId: shopData?.shopId ? shopData.shopId : 0,
                })
              }
            >
              Clear All
            </button>
          </div>
          <div className='flex w-full flex-col items-center gap-y-2 '>
            {historyData?.searchHistories?.map((history) => (
              <HistoryItems
                clickOnHistory={searchByHistoryItem}
                removeHandler={removeSearchHistory}
                history={history}
                key={history.id}
                currShopId={shopData?.shopId}
              />
            ))}
          </div>
        </>
      ) : (
        <div className='text-md flex items-center py-3 text-left font-semibold'>
          No Recent Searches
        </div>
      )}
    </>
  );
};
export default History;
