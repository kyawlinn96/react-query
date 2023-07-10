import { CartItem } from '@/types';

export const getSubTotal = (products: CartItem[]) => {
  return products.reduce(
    (total, current) => total + current.price * current.qty,
    0
  );
};

export const getTotalDiscount = (products: CartItem[]) => {
  return products.reduce((total, product) => {
    const discount =
      product.promotePercent > 0
        ? (product.price - product.promotePrice) * product.qty
        : 0;
    return total + discount;
  }, 0);
};

export const getTotal = (products: CartItem[], deliveryFee: number) => {
  const subTotal = getSubTotal(products);
  const discount = getTotalDiscount(products);
  return subTotal + deliveryFee - discount;
};
