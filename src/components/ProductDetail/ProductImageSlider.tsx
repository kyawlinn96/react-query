import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import dayjs from 'dayjs';

// assets
import PopperEmoji from '@/assets/popper-emoji.svg';

interface Props {
  productImage: {
    id: number;
    publicId: null;
    url: string;
    thumbnailPublicId: null;
    thumbnailUrl: string;
    miniUrl: string;
    isMain: true;
    productId: number;
    seqNo: number;
    product: null;
    createdDate: string;
    createdBy: number;
    updatedDate: null;
    updatedBy: null;
  }[];
  promotionEndDate: string | null;
  promotionStartDate: string | null;
}

const ProductImageSlider = ({
  productImage,
  promotionEndDate,
  promotionStartDate,
}: Props) => {
  const zoomRef = useRef<null | any>(null);
  const thumbNailRef = useRef(null);

  const [openLightbox, setOpenLightbox] = useState(false);

  return (
    <>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        modules={[Pagination]}
        className='swiperSlider'
      >
        {productImage?.length > 0 && (
          <div className='relative'>
            {productImage?.map((data) => (
              <SwiperSlide key={data.id}>
                <div className='h-[100vw] w-full bg-white object-contain'>
                  <img
                    src={data?.url}
                    onClick={() => setOpenLightbox((prev) => !prev)}
                    className='h-auto w-full'
                    alt=''
                  />
                  {promotionEndDate && promotionStartDate && (
                    <div className='absolute bottom-0 right-0 z-50 rounded-tl-[30px] bg-primary px-5 py-2'>
                      <div className='flex items-center gap-x-2'>
                        <img src={PopperEmoji} alt='emoji' className='w-6' />
                        <div>
                          <p className='text-xs font-light text-white'>
                            Promotion Period
                          </p>
                          <div className='flex items-center gap-x-1'>
                            <p className='text-sm font-semibold text-white'>
                              {dayjs(promotionEndDate).format('DD MMM')}
                            </p>
                            <p className='text-white'>-</p>
                            <p className='text-sm font-semibold text-white'>
                              {dayjs(promotionStartDate).format('DD MMM')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </div>
        )}
      </Swiper>

      <Lightbox
        plugins={[Zoom, Thumbnails]}
        open={openLightbox}
        zoom={{ ref: zoomRef }}
        thumbnails={{ ref: thumbNailRef }}
        close={() => setOpenLightbox(false)}
        slides={productImage?.map((data) => ({ src: data?.url }))}
        toolbar={['close']}
        on={{
          click: () => zoomRef.current?.zoomIn(),
        }}
      />
    </>
  );
};

export default ProductImageSlider;
