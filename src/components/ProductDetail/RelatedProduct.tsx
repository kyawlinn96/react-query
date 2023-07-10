import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// icons
import ForwardArrow from '@/assets/svgcomponents/ForwardArrow';

interface Props {
  relatedProducts: {
    firstSkuId: number;
    firstSkuValue: string;
    isFav: boolean;
    isGetOne: boolean;
    leftQtyForFirstSkuValue: number;
    name: string;
    originalPrice: number;
    productCategoryId: number;
    productId: number;
    promotePercent: number;
    promotePrice: number;
    promotionEndDate: null;
    promotionStartDate: null;
    sku: string;
    skuValueSize: number;
    totalQty: number;
    url: string;
  }[];
}

const RelatedProduct = ({ relatedProducts }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      {relatedProducts?.length > 0 && (
        <div className='mb-16 px-4 py-3'>
          {/* ----- header ----- */}
          <div className='flex items-center justify-between'>
            <p className='text-lg font-semibold text-gray-800'>
              Related Products
            </p>
            <div className='flex items-center gap-x-2'>
              <p className='text-sm text-[#929292]'>More</p>
              <ForwardArrow className='w-3.5 fill-gray-400/80' />
            </div>
          </div>

          {/* ----- product card ----- */}
          <div className='mt-3'>
            <Swiper
              className='mySwiper related-products'
              spaceBetween={10}
              slidesPerView={'auto'}
            >
              {relatedProducts?.slice(0, 6).map((product) => (
                <SwiperSlide
                  key={product.productId}
                  className='rounded-md bg-[#F7F7F7] py-3'
                  style={{ width: 'auto' }}
                >
                  <div
                    onClick={() => {
                      navigate(`/productdetail/${product?.productId}`);
                    }}
                    className='flex h-full flex-col px-3'
                  >
                    <div className='relative'>
                      <img
                        src={product.url}
                        alt={product.name}
                        className='mb-2 h-[126px] w-[126px]'
                      />
                    </div>
                    <div>
                      <h3 className='line-clamp-2 w-[126px]'>{product.name}</h3>
                    </div>
                    <div className='mt-auto flex flex-col '>
                      {product.promotePercent > 0 ? (
                        <div className='mt-auto'>
                          <p className='font-semibold text-[#CF202D]'>
                            {product.promotePrice} Ks
                          </p>
                          <p className='line-through'>
                            {product.originalPrice} Ks
                          </p>
                        </div>
                      ) : (
                        <p className='font-semibold text-[#CF202D]'>
                          {product.originalPrice} Ks
                        </p>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedProduct;
