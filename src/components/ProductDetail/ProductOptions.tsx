import { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import ForwardArrow from '@/assets/svgcomponents/ForwardArrow';
import IconProductDetailCart from '../icon/IconProductDetailCart';
import IconBuyNow from '../icon/IconBuyNow';
import Drawer from '../ui/Drawer';
import { ProductDetailResponse } from '@/api/product-detail/product-detail-query';
import { ProductVariantValue } from '@/types';

interface Props {
  product: ProductDetailResponse;
  productImage2: string | undefined;
  isShowVariantBox: boolean;
  setIsShowVariantBox: Dispatch<SetStateAction<boolean>>;
  selectedVariants: any[];
  handleSelectedVariantChg: (
    index: number,
    variantValue: ProductVariantValue
  ) => void;
  qty: number;
  addQty: () => void;
  reduceQty: () => void;
  handleAddOrBuyNow: (checkVariant: boolean, isBuyNow: boolean) => void;
}

const ProductOptions = ({
  product,
  productImage2,
  isShowVariantBox,
  setIsShowVariantBox,
  selectedVariants,
  handleSelectedVariantChg,
  qty,
  addQty,
  reduceQty,
  handleAddOrBuyNow,
}: Props) => {
  const optionsText: string[] =
    product.variant
      ?.map((variant) => {
        const plural = variant.variantValues?.length > 1 ? 's' : '';
        return `${variant.variantValues?.length} ${variant.name}${plural}`;
      })
      .filter(Boolean) || [];

  const handleOpenVariationBox = () => {
    if (optionsText) {
      setIsShowVariantBox(true);
    }
  };

  return (
    <div className='px-4 py-3'>
      {/* ----- header ----- */}
      <div className='flex items-center justify-between'>
        <p className='text text-gray-800'>Product Options</p>
        <div
          className='flex items-center justify-center gap-2'
          onClick={() => {
            setIsShowVariantBox(true);
          }}
        >
          <p className='text-xs text-gray-400'>{optionsText?.join(', ')}</p>
          <ForwardArrow className='w-3.5 fill-gray-400/80' />
        </div>
      </div>

      {/* ----- show first variant ----- */}
      <div className='mt-2 grid grid-cols-5 gap-2'>
        {product.variant?.[0]?.variantValues?.slice(0, 6)?.map((variant) => (
          <div key={variant.valueId} onClick={handleOpenVariationBox}>
            {variant.url ? (
              <img
                src={variant.url}
                alt={variant?.valueName || 'product image'}
                className=''
              />
            ) : (
              <p className='rounded-[5px] bg-gray-100 py-1 text-center text-sm text-gray-600'>
                {variant.valueName}
              </p>
            )}
          </div>
        ))}
      </div>

      <Drawer
        open={isShowVariantBox}
        onClose={() => setIsShowVariantBox(false)}
      >
        <div className='rounded-t-2xl bg-white pt-2'>
          <div className='mx-auto h-[3px] w-16 rounded-md bg-gray-400/70'></div>
          <header className='p-4 text-center text-lg font-semibold'>
            Select Options
          </header>

          <div className='mt-2 flex items-start gap-x-3 px-4'>
            <img
              src={productImage2}
              alt='product'
              className='h-[80px] w-[80px] rounded-md'
            />
            <div>
              {product.promotePercent > 0 && (
                <p className='w-16 rounded-[5px] border-2 border-primary bg-primary-light px-1 text-center text-[13px] text-primary'>
                  {product.promotePercent}% Off
                </p>
              )}
              <p className='mt-1'>{product.name}</p>
              <div className='mt-1'>
                {product.promotePercent > 0 ? (
                  <div className='flex items-baseline gap-x-2'>
                    <p className='font-semibold'>{product.promotePrice} Ks</p>
                    <p className='font-[13px] text-gray-400 line-through'>
                      {product.originalPrice} Ks
                    </p>
                  </div>
                ) : (
                  <p className='font-semibold'>{product.originalPrice} Ks</p>
                )}
              </div>
              <p>
                {selectedVariants
                  ?.filter((v) => !!v)
                  ?.map((variant) => variant?.valueName)
                  ?.join(',')}
              </p>
            </div>
          </div>

          <hr className='my-2 mt-4' />

          <div className='max-h-[40vh] overflow-y-auto px-4'>
            {product.variant.map((variant, index) => (
              <div className='mt-2'>
                <p>{variant.name}</p>
                <div className='mt-2 grid grid-cols-4 gap-2'>
                  {variant.variantValues.map((variant) => (
                    <>
                      {variant.url ? (
                        <div
                          onClick={() => {
                            handleSelectedVariantChg(index, variant);
                          }}
                          className={`rounded-[10px] bg-gray-100 ${
                            selectedVariants[index]?.valueId ===
                              variant.valueId && 'ring-2 ring-primary'
                          }`}
                        >
                          <img
                            src={variant.url}
                            alt={variant.valueName}
                            className='rounded-[10px]'
                          />
                          <p
                            className={cn(
                              'pb-1 text-center text-sm text-gray-600',
                              selectedVariants[index]?.valueId ===
                                variant.valueId && 'font-semibold text-primary'
                            )}
                          >
                            {variant.valueName}
                          </p>
                        </div>
                      ) : (
                        <p
                          onClick={() => {
                            handleSelectedVariantChg(index, variant);
                          }}
                          className={`rounded-[5px] bg-gray-100 py-1 text-center text-sm text-gray-600 ${
                            selectedVariants[index]?.valueId ===
                              variant.valueId && 'bg-primary text-white'
                          }`}
                        >
                          {variant.valueName}
                        </p>
                      )}
                    </>
                  ))}
                </div>
                <hr className='my-3' />
              </div>
            ))}
          </div>

          <div className='flex justify-end p-4 pb-0'>
            <div className='flex w-[120px] items-center justify-around rounded-sm'>
              <button disabled={qty < 2} onClick={reduceQty}>
                <img src='/img/icons/minus-fill.svg' alt='' />
              </button>
              <div className='rounded-[5px] border-2 border-gray-200 px-6 py-[2px] text-xs'>
                {qty}
              </div>
              <button onClick={addQty} className='focus:outline-none'>
                <img src='/img/icons/plus-fill.svg' alt='' />
              </button>
            </div>
          </div>

          <div className='flex w-full items-center gap-x-2 bg-white p-4'>
            <button
              onClick={() => handleAddOrBuyNow(false, false)}
              className='flex w-full items-center justify-center gap-x-2 rounded-[10px] border-2 border-primary bg-white py-2'
            >
              <IconProductDetailCart />
              <p className='text-primary'>Add to Cart</p>
            </button>
            <button
              onClick={() => handleAddOrBuyNow(false, true)}
              className='flex w-full items-center justify-center gap-x-2 rounded-[10px] border-2 border-primary bg-primary py-2'
            >
              <IconBuyNow />
              <p className='text-white'>Buy Now</p>
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ProductOptions;
