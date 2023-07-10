import IconArrow from '@/components/icon/IconArrow';
import { CartItem, OrderItem, ShopInfo } from '@/types';
import { useMemo } from 'react';
import Item from './Item';
import { useNavigate } from 'react-router-dom';

interface Props {
  items: OrderItem[];
  shopList: ShopInfo[];
}

const MultiShopItems = ({ items, shopList }: Props) => {
  const navigate = useNavigate();
  // Group products by shopId
  const itemGroups = useMemo(
    () =>
      items.reduce((acc: { [key: number]: OrderItem[] }, item) => {
        const { shopId } = item;
        if (acc[shopId]) {
          acc[shopId].push(item);
        } else {
          acc[shopId] = [item];
        }
        return acc;
      }, {}),
    [items]
  );

  if (!itemGroups) return <div>Error.</div>;

  return (
    <>
      {Object.values(itemGroups).map((itemGroup, idx) => (
        <div key={idx} className='mt-2 rounded-[10px] bg-white'>
          <div
            onClick={() => navigate(`/shops/${itemGroup[0].id}`)}
            className='flex items-center gap-4 border-b p-4 py-3'
          >
            <img
              className='h-[18px] w-[18px]'
              src='/img/icons/shop-logo-sm.svg'
              alt=''
            />
            <span className='text-base font-semibold'>
              {
                shopList.find((shop) => itemGroup[0].shopId === shop.shopId)
                  ?.shopName
              }
            </span>
            <IconArrow className='text-3xl text-gray-400' />
          </div>
          {itemGroup.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      ))}
    </>
  );
};

export default MultiShopItems;
