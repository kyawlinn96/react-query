import { useEffect } from 'react';

// stores
import { useProductDetailStore } from '@/stores/productDetailStore';

// api
import { useUpdateWishList } from '@/api/myaccount/myaccount-update-whishlists';

// components
import SearchBar from '@/components/ProductDetail/SearchBar';
import ProductImageSlider from '@/components/ProductDetail/ProductImageSlider';
import BreadCrumb from '@/components/ProductDetail/BreadCrumb';
import ProductInfo from '@/components/ProductDetail/ProductInfo';
import ProductOptions from '@/components/ProductDetail/ProductOptions';
import Shop from '@/components/ProductDetail/Shop';
import Description from '@/components/ProductDetail/Description';
import RelatedProduct from '@/components/ProductDetail/RelatedProduct';
import Brand from '@/components/ProductDetail/Brand';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import IconProductDetailCart from '@/components/icon/IconProductDetailCart';
import IconBuyNow from '@/components/icon/IconBuyNow';
import IconContactUs from '@/components/icon/IconContactUs';
import { toaster } from '@/components/ui/Toast';
import Loading from './Loading';

// hooks
import useProductDetail from './useProductDetail';

// assets
import Warning from '@/assets/warning.svg';
import WishList from '@/assets/wishlist.svg';

const ProductDetail = () => {
  const {
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
  } = useProductDetail();
  const { setProduct } = useProductDetailStore();

  useEffect(() => {
    product && setProduct(product);
  }, [product]);

  const updateWishList = useUpdateWishList();

  const handleWishList = () => {
    const postData = {
      productId: Number(id),
      isFav: !product?.isFav,
    };

    updateWishList.mutate(postData, {
      onSuccess() {
        if (!product?.isFav) {
          toaster.show('Successfully added to wishlists.');
        } else {
          toaster.show('Successfully removed from wishlists.');
        }
      },
      onError() {
        toaster.show('Fail to update wishlists');
      },
    });
  };

  if (isLoading || relatedProductLoading || !product) {
    return <Loading />;
  }
  if (isError || relatedProductError) {
    return null;
  }

  return (
    <>
      <SearchBar />

      {!isShopClosed && (
        <div className='mx-4 my-3 flex items-center gap-x-2 rounded-md bg-[#CF202D10] px-4 py-3'>
          <img src={Warning} alt='warning' />
          <p className='font-medium text-primary'>
            This shop has temporarily closed!
          </p>
        </div>
      )}

      <ProductImageSlider
        productImage={product.productImage}
        promotionEndDate={product.promotionEndDate}
        promotionStartDate={product.promotionStartDate}
      />

      <BreadCrumb categoryStep={product.categorySteps} />

      <ProductInfo product={product} />

      <hr className='mx-4' />

      {!isDefaultVariant && (
        <ProductOptions
          product={product}
          productImage2={productImage}
          isShowVariantBox={isShowVariantBox}
          setIsShowVariantBox={setIsShowVariantBox}
          selectedVariants={selectedVariants}
          handleSelectedVariantChg={handleSelectedVariantChg}
          qty={qty}
          addQty={addQty}
          reduceQty={reduceQty}
          handleAddOrBuyNow={handleAddOrBuyNow}
        />
      )}

      <hr className='mx-4' />

      <Shop shop={product.shop} />

      <hr className='mx-4' />

      <Brand brand={product?.brand} />

      <hr className='mx-4' />

      <Description description={product?.description} />

      <div className='h-[8px] w-full bg-gray-200' />

      {relatedProducts && <RelatedProduct relatedProducts={relatedProducts} />}

      <div className='fixed bottom-0 z-20 w-full bg-white'>
        <div className='flex items-center gap-x-2 px-4 py-3'>
          <div className='rounded-md border-2 border-primary bg-primary p-2'>
            <IconContactUs />
          </div>
          {!isShopClosed ? (
            <button
              onClick={handleWishList}
              className='flex w-full items-center justify-center gap-x-2 rounded-[10px] border-2 border-primary py-2'
            >
              <img src={WishList} alt='wish-list' />
              <p className='text-primary'>Add to Wish List</p>
            </button>
          ) : (
            <>
              <button
                onClick={() => handleAddOrBuyNow(true)}
                className='flex w-full items-center justify-center gap-x-2 rounded-[10px] border-2 border-primary py-2'
              >
                <IconProductDetailCart />
                <p className='text-primary'>Add to Cart</p>
              </button>
              <button
                onClick={() => handleAddOrBuyNow(true, true)}
                className='flex w-full items-center justify-center gap-x-2 rounded-[10px] border-2 border-primary bg-primary py-2'
              >
                <IconBuyNow />
                <p className='text-white'>Buy Now</p>
              </button>
            </>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={showDialogBox}
        onConfirm={handleConfirm}
        onCancel={() => setShowDialogBox(false)}
        title='Are you sure?'
        description='This will remove all existing products in your cart.'
      />
    </>
  );
};

export default ProductDetail;
