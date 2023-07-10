import { OrderItem, OrderWeightInfo } from '@/types';

export const getSubTotal = (products: OrderItem[]) => {
  return products.reduce(
    (total, current) => total + current.originalPrice * current.qty,
    0
  );
};

export const getTotalDiscount = (products: OrderItem[]) => {
  const val = products.reduce((total, product) => {
    const discount =
      (product.originalPrice - product.promotePrice) * product.qty;
    return total + discount;
  }, 0);
  return Math.round(val);
};

export const getTotal = (products: OrderItem[], deliveryFee: number) => {
  const subTotal = getSubTotal(products);
  const discount = getTotalDiscount(products);
  return subTotal + deliveryFee - discount;
};

export const getDeliveryFee = (
  weightInfo: OrderWeightInfo,
  deliveryFee: number
) => {
  if (weightInfo) {
    return deliveryFee - weightInfo.finalWeightFee;
  }
  return deliveryFee;
};
