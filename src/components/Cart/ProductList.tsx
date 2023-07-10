import { CartItem, ShopInfo } from '@/types';
import MultiShopProductList from './MultiShopProductList';
import ProductItem from './ProductItem';
import { useRemoveFromCart } from '@/api/cart/remove-from-cart-mutation';
import { useState } from 'react';
import ConfirmDialog from '../ui/ConfirmDialog';
import useCartStore from '@/stores/cartStore';

interface Props {
  products: CartItem[];
  shopList: ShopInfo[];
}

const ProductList = ({ products, shopList }: Props) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutateAsync } = useRemoveFromCart();
  const { isBuyNow } = useCartStore();

  if (shopList.length > 1)
    return <MultiShopProductList products={products} shopList={shopList} />;

  const handleRemoveAll = async () => {
    // not efficient too much though
    // should have an api for bulk delete
    const mutations = products.map((product) =>
      mutateAsync({ productId: product.productId, skuId: product.skuId })
    );
    await Promise.all(mutations);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className='mt-2 rounded-[10px] bg-white'>
        <div className='flex items-center justify-between border-b p-4 py-3'>
          <span className='text-base font-bold'>Items ({products.length})</span>
          {!isBuyNow && (
            <button
              className='text-sm text-gray-400'
              onClick={() => setShowDeleteDialog(true)}
            >
              Clear All
            </button>
          )}
        </div>

        {products.map((product) => (
          <ProductItem key={product.productId} data={product} />
        ))}
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        title='Are you sure?'
        description='You want to delete all products?'
        onConfirm={handleRemoveAll}
      />
    </>
  );
};

export default ProductList;
