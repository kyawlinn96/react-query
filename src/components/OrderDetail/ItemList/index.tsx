import { OrderItem, ShopInfo } from '@/types';
import MultiShopItems from './MultiShopItems';
import Item from './Item';

interface Props {
  products: OrderItem[];
  shopList: ShopInfo[];
}

const ItemList = ({ products, shopList }: Props) => {
  if (shopList.length > 1)
    return <MultiShopItems items={products} shopList={shopList} />;

  return (
    <div className='mt-2 rounded-[10px] bg-white'>
      <div className='flex items-center justify-between border-b p-4 py-3'>
        <span className='text-base text-gray-600'>
          {products.length} {products.length > 1 ? 'Items' : 'Item'}
        </span>
      </div>
      {products.map((product) => (
        <Item key={product.id} item={product} />
      ))}
    </div>
  );
};

export default ItemList;
