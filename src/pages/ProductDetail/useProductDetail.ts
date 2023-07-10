import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// types
import { ProductVariantValue } from '@/types';

// api
import { useGetProductDetail } from '@/api/product-detail/product-detail-query';
import { useGetRelatedProducts } from '@/api/product-detail/product-related-query';
import { useAddToCart } from '@/api/cart/add-to-cart-mutation';
import { useGetOrderSettingDetail } from '@/api/cart/order-setting-detail';
import { useGetCartDetail } from '@/api/cart/cart-detail-query';

// components
import { toaster } from '@/components/ui/Toast';

interface SkuType {
  bestBeforeDate: null;
  canPreOrder: boolean;
  expireDate: null;
  fixedAmount: number;
  fromPrice: number;
  hasFromToPrice: boolean;
  isShowLeftQty: boolean;
  isShowSoldQty: boolean;
  manufactureDate: null;
  memberPointEarn: number;
  originalPrice: number;
  point: number;
  productPreOrder: null;
  productSkuImages:
    | {
        id: number;
        isMain: boolean;
        miniUrl: string;
        productId: number;
        skuId: number;
        thumbnailUrl: string;
        url: string;
        valueName: string;
        variantName: string;
      }[]
    | [];
  promotePercent: number;
  promotePrice: number;
  purchasePrice: number;
  qty: number;
  rewardAmount: number;
  rewardPercent: number;
  skuId: number;
  soldQty: number;
  toPrice: number;
  value: string;
  weight: { amount: number; symbol: string; weightId: number };
  weightForCalculation: null;
}

const useProductDetail = () => {
  const { productId: id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Number(id) || !id) {
      navigate('/', {
        replace: true,
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const productId = Number(id)!;

  const { mutate } = useAddToCart();
  const {
    isLoading,
    isError,
    data: product,
  } = useGetProductDetail(productId, {
    enabled: Boolean(productId),
  });
  const { data: cart } = useGetCartDetail();
  const { data: orderSetting } = useGetOrderSettingDetail();

  const isShopClosed = product?.shop?.isAvailable;
  const isAllowMultiShopOrder = orderSetting?.allowOrderFromMultiShop;
  const categoryId = product?.productCategory[0].productCategoryId;

  const {
    isLoading: relatedProductLoading,
    isError: relatedProductError,
    data: relatedProducts,
  } = useGetRelatedProducts(categoryId, productId);

  const [showDialogBox, setShowDialogBox] = useState(false);
  const [isShowVariantBox, setIsShowVariantBox] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<
    ProductVariantValue[]
  >([]);
  const [qty, setQty] = useState(1);
  const [productImage, setProductImage] = useState<string>();
  const isDefaultVariant = product?.variant[0]?.name === 'Default';

  // precast function for out of stock product
  const isReadyToPrecast = (arr: any[] = []): boolean => {
    if (arr.length <= 1) return false;
    return arr.slice(0, -1).every((element) => !!element);
  };

  const JSON_selectedVariants = JSON.stringify(selectedVariants);
  useEffect(() => {
    if (isReadyToPrecast(selectedVariants)) {
      const selectedSkuValue = selectedVariants
        .map((variant) => variant?.valueName)
        .join(',');

      const precastedItems = product?.skuValue.filter((sku) =>
        sku?.value.startsWith(selectedSkuValue)
      );
    }

    if (selectedVariants.length === product?.variant.length) {
      const selectedSkuValue = selectedVariants
        .map((variant) => variant?.valueName)
        .join(',');

      const foundSku: SkuType[] | any = product?.skuValue.find(
        (skuVal) => skuVal.value === selectedSkuValue
      );

      if (foundSku?.productSkuImages[0]?.miniUrl) {
        setProductImage(foundSku.productSkuImages[0]?.miniUrl);
      } else {
        setProductImage(product?.productImage[0].url);
      }
    }
  }, [
    JSON_selectedVariants,
    product?.productImage,
    product?.skuValue,
    product?.variant.length,
    selectedVariants,
  ]);

  const JSON_productDetail = JSON.stringify(product);
  useEffect(() => {
    setProductImage(product?.productImage[0].url);
  }, [JSON_productDetail, product?.productImage]);

  // select variant values
  const handleSelectedVariantChg = (
    index: number,
    variantValue: ProductVariantValue
  ) => {
    if (selectedVariants[index]?.valueId !== variantValue.valueId) {
      setSelectedVariants((prev: ProductVariantValue[]) => {
        prev[index] = variantValue;
        return [...prev];
      });
    }
  };

  // qty control
  const addQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const reduceQty = () => {
    setQty((prevQty) => prevQty - 1);
  };

  const handleAddOrBuyNow = (
    checkVariant: boolean = false,
    isBuyNow: boolean = false
  ) => {
    if (checkVariant && !isDefaultVariant) {
      setIsShowVariantBox(true);
      return;
    }

    if (
      !isDefaultVariant &&
      selectedVariants.filter(Boolean).length !== product?.variant.length
    ) {
      toaster.show('Please select all product options');
    }

    if (!isBuyNow && !isAllowMultiShopOrder) {
      const shopList = cart?.shopInfo;
      if (
        shopList?.length &&
        !shopList?.some((shop) => shop.shopId === product?.shopId)
      ) {
        setShowDialogBox(true);
        return;
      }
    }

    if (isBuyNow) {
      buyNow();
    } else {
      addToCart();
    }
  };

  const handleConfirm = () => {
    addToCart();
  };

  const getSelectedSku = () =>
    product?.skuValue.find((sku) => {
      const skuVal = selectedVariants
        .map((variant) => variant.valueName)
        .join(',');
      return sku.value === skuVal;
    });

  const addToCart = () => {
    if (isDefaultVariant) {
      mutate(
        { productId: productId, skuId: 1, qty: 1 },
        {
          onSuccess() {
            toaster.show('Added to cart');
          },
        }
      );
      setShowDialogBox(false);
      return;
    }
    const selectedSku = getSelectedSku();
    if (!selectedSku) {
      alert('Selected sku not found');
      return;
    }
    mutate(
      { productId: productId, skuId: selectedSku?.skuId, qty: qty },
      {
        onSuccess() {
          toaster.show('Added to cart');
        },
      }
    );
    setShowDialogBox(false);
    setIsShowVariantBox(false);
  };

  const buyNow = () => {
    if (isDefaultVariant) {
      navigate(`/cart?productId=${productId}&skuId=1&qty=1`);
      setShowDialogBox(false);
      return;
    }
    const selectedSku = getSelectedSku();
    if (!selectedSku) {
      alert('Selected sku not found');
      return;
    }
    navigate(
      `/cart?productId=${productId}&skuId=${selectedSku.skuId}&qty=${qty}`
    );
    setShowDialogBox(false);
    setIsShowVariantBox(false);
  };

  return {
    handleConfirm,
    id,
    isLoading,
    relatedProductLoading,
    isError,
    relatedProductError,
    product,
    isShopClosed,
    relatedProducts,
    selectedVariants,
    isDefaultVariant,
    showDialogBox,
    setShowDialogBox,
    isShowVariantBox,
    setIsShowVariantBox,
    productImage,
    qty,
    addQty,
    reduceQty,
    handleAddOrBuyNow,
    handleSelectedVariantChg,
  };
};

export default useProductDetail;
