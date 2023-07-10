import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// asset
import FollowTik from '@/assets/follow_tik.svg';

interface Props {
  shopList: {
    shopId: number;
    shopName: string;
    imageUrl: string;
    isFollowed: boolean;
    popularPercent: number;
    products: {
      productId: number;
      productImg: string;
      createdDate: string;
    }[];
  };
}

const ShopCard = ({ shopList }: Props) => {
  const navigate = useNavigate();

  return (
    <div className='mt-3 rounded-[10px] bg-white'>
      <div className='flex items-center justify-between px-4 py-3'>
        <div className='flex items-center gap-x-3'>
          <div className='w-11'>
            <img
              src={shopList.imageUrl}
              alt={shopList.shopName}
              className='h-full w-full rounded-full object-contain'
            />
          </div>
          <div>
            <p className='line-clamp-2 text-lg font-medium'>
              {shopList.shopName}
            </p>
            {shopList.isFollowed === true && (
              <div className='flex items-center gap-x-1'>
                <img src={FollowTik} alt='follow-check' />
                <p className='text-sm text-gray-400'>Followed</p>
              </div>
            )}
          </div>
        </div>
        <p
          onClick={() => navigate(`/shops/${shopList.shopId}`)}
          className='rounded-md bg-primary-light px-4 py-1 text-sm font-medium text-primary'
        >
          Visit
        </p>
      </div>

      <div className='w-[100%] border-t border-dashed border-[#D9D9D9]' />

      <Swiper
        className='mySwiper px-4 py-3'
        spaceBetween={10}
        slidesPerView={'auto'}
      >
        {shopList?.products?.slice(0, 6).map((product) => (
          <SwiperSlide
            key={product.productId}
            className='!w-16 rounded-md bg-[#F7F7F7]'
            style={{ width: 'auto' }}
          >
            <img
              src={product.productImg}
              onClick={() => navigate(`/productdetail/${product?.productId}`)}
              alt='product'
              className='h-full w-full rounded-sm object-contain'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopCard;
