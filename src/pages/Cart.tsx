import { useRemoveFromCart } from '@/api/cart/remove-from-cart-mutation';
import { usePostOrder } from '@/api/order/post-order-mutation';
import DeliveryInfo from '@/components/Cart/DeliveryInfo';
import DeliveryService from '@/components/Cart/DeliveryService';
import EmptyCart from '@/components/Cart/EmptyCart';
import MakePayment from '@/components/Cart/MakePayment';
import ProductList from '@/components/Cart/ProductList';
import ShopInfo from '@/components/Cart/ShopInfo';

import { getTotal } from '@/components/Cart/utils';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Loading from '@/components/ui/Loading';
import useCartStore from '@/stores/cartStore';
import { getDeliveryInfo, getProductList } from '@/utils/cart-utils';
import { formatNumber } from '@/utils/number-utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    isBuyNow,
    totalAmt,
    netAmt,
    productInfo,
    shopInfo,
    deliveryInfo,
    deliveryFee,
    showRemoveProductModal,
    removeProduct,
    setShowRemoveProductModal,
  } = useCartStore();
  const navigate = useNavigate();
  const { mutate } = useRemoveFromCart();
  const { mutate: postOrder, isLoading } = usePostOrder();
  const [remark, setRemark] = useState('');

  const total = getTotal(productInfo, deliveryFee);

  const handleRemoveProduct = () => {
    if (showRemoveProductModal.product?.productId) {
      mutate({
        productId: showRemoveProductModal.product.productId,
        skuId: showRemoveProductModal.product.skuId,
      });
      removeProduct(showRemoveProductModal.product.productId);
      setShowRemoveProductModal(null);
    }
  };

  const handlePostOrder = () => {
    const pin = window.prompt('Enter PIN');
    if (Number(pin) === 1899) {
      const productList = getProductList(productInfo);
      const deliInfo = getDeliveryInfo(deliveryInfo, remark);
      postOrder(
        {
          totalAmt,
          netAmt,
          deliveryFee,
          userPhoneNo: deliveryInfo.phoNo,
          serviceCode: 0,
          isChargesForExtraWeight: true,
          platform: 3,
          handlingFee: 0,
          tax: 0,
          discountPrice: 0,
          discountPercent: 0,
          isSeller: false,
          productInfo: productList,
          deliveryInfo: deliInfo,
          paymentInfo: {
            paymentServiceId: 11,
            bankId: 0,
            phoNo: deliInfo.phoNo,
            remark: '',
            approvalImage: [],
          },
          isIncludeFromToPriceProduct: false,
          isFreeDelivery: false,
          postOrderTypeId: isBuyNow ? 2 : 1,
        },
        {
          onSuccess(data) {
            navigate(`/orders/${data.orderId}`, {
              replace: true,
            });
          },
        }
      );
    } else {
      window.alert('Wrong pin');
    }
  };

  return (
    <>
      {productInfo.length ? (
        <div className='bg-gray-100 px-4 pb-14 pt-2'>
          <ProductList products={productInfo} shopList={shopInfo} />

          {shopInfo.length === 1 ? <ShopInfo info={shopInfo[0]} /> : null}

          <DeliveryInfo info={deliveryInfo} editable />

          <DeliveryService />

          <MakePayment products={productInfo} deliveryFee={deliveryFee} />

          <textarea
            placeholder='Notes'
            rows={4}
            className='mt-2 w-full resize-none rounded-[10px] border p-4 text-sm focus:border-gray-300 focus:outline-none'
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          ></textarea>

          <Button
            // loading={isLoading}
            onClick={handlePostOrder}
            fullWidth
            className='my-4'
          >
            Pay Now ({formatNumber(total)} Ks)
          </Button>
        </div>
      ) : (
        <EmptyCart />
      )}

      <ConfirmDialog
        open={showRemoveProductModal.show}
        onConfirm={handleRemoveProduct}
        onCancel={() => setShowRemoveProductModal(null)}
        title='Are you sure?'
        description='You want to delete this product?'
      />

      <Loading open={isLoading} />
    </>
  );
};

export default Cart;
