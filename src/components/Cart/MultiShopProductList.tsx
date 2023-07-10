import IconArrow from '@/components/icon/IconArrow';
import { CartItem, ShopInfo } from '@/types';
import { useMemo } from 'react';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';

interface Props {
  products: CartItem[];
  shopList: ShopInfo[];
}

const MultiShopProductList = ({ products, shopList }: Props) => {
  const navigate = useNavigate();
  // Group products by shopId
  const groupedProducts = useMemo(
    () =>
      products.reduce((acc: { [key: number]: CartItem[] }, product) => {
        const { shopId } = product;
        if (acc[shopId]) {
          acc[shopId].push(product);
        } else {
          acc[shopId] = [product];
        }
        return acc;
      }, {}),
    [products]
  );

  if (!groupedProducts) return <div>Error.</div>;

  return (
    <>
      {Object.values(groupedProducts).map((productGroup, idx) => (
        <div key={idx} className='mt-2 rounded-[10px] bg-white'>
          <div
            className='flex items-center gap-2 border-b p-4 py-3'
            onClick={() => navigate(`/shops/${productGroup[0].shopId}`)}
          >
            <img
              className='h-[18px] w-[18px]'
              src='/img/icons/shop-logo-sm.svg'
              alt=''
            />
            <span className='text-base font-semibold'>
              {
                shopList.find((shop) => productGroup[0].shopId === shop.shopId)
                  ?.shopName
              }
            </span>
            <IconArrow className='h-4 w-4 text-gray-400' />
          </div>
          {productGroup.map((product) => (
            <ProductItem key={product.productId} data={product} />
          ))}
        </div>
      ))}
    </>
  );
};

export default MultiShopProductList;
