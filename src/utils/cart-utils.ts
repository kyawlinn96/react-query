import { CartItem, DeliveryInfo } from '@/types';

export const getProductList = (productList: CartItem[]) => {
  return productList.map((product) => ({
    productId: product.productId,
    skuId: product.skuId,
    price: product.price,
    qty: product.qty,
    point: 0,
    shopId: product.shopId,
  }));
};

export const getDeliveryInfo = (
  cartDeliveryInfo: DeliveryInfo,
  remark: string
) => {
  const deliveryInfoForPostOrder = {
    name: cartDeliveryInfo.name,
    cityId: cartDeliveryInfo.cityId,
    townshipId: cartDeliveryInfo.townshipId,
    phoNo: cartDeliveryInfo.phoNo,
    address: cartDeliveryInfo.address,
    landMark: cartDeliveryInfo.landmark,
    remark,
    deliveryDate: new Date().toISOString(),
    fromTime: cartDeliveryInfo.fromEstDeliveryDay,
    toTime: cartDeliveryInfo.toEstDeliveryDay,
    selectedDeliveryInfo: {
      id: 1,
      isMain: true,
      deliveryServiceId: 1,
      deliveryServiceName: 'Custom Delivery',
      deliveryServiceEmail: '',
      deliveryServicePhno: '',
      logoPath: '',
      deliveryFee: 2500,
      fromEstDeliveryDay: 0,
      toEstDeliveryDay: 0,
    },
  };

  return deliveryInfoForPostOrder;
};
