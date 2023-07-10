import { useNavigate } from 'react-router-dom';

// components
import BottomNavigation from '@/components/BottomNavigation';
import SectionHeading from '@/components/CommonUi/SectionHeading';
import FollowAndWishLists from '@/components/MyAccount/FollowAndWishLists';
import ProductCard from './ProductCard';

// assets
import ForwardArrow from '@/assets/svgcomponents/ForwardArrow';
import Order from '@/assets/profile/order.svg';
import Packed from '@/assets/profile/packed.svg';
import Delivering from '@/assets/profile/delivering.svg';
import Review from '@/assets/profile/review.svg';
import Cancel from '@/assets/profile/cancel.svg';
import Phone from '@/assets/profile/phone.svg';
import Location from '@/assets/profile/location.svg';
import Translation from '@/assets/profile/translation.svg';
import Faq from '@/assets/profile/faq.svg';
import UserGuide from '@/assets/profile/guide.svg';
import Policy from '@/assets/profile/policy.svg';
import RecentView from './RecentView';
import { useState } from 'react';
import CustomDialog from '@/components/ui/CustomDialog';
import { useTranslation } from 'react-i18next';

const MyProfile = () => {
  const navigate = useNavigate();
  const [openLangDialog, setOpenLangDialog] = useState();
  const { t } = useTranslation();

  const ORDER_DATA = [
    { id: 1, image: Order, title: 'Ordered', redirect: '/orders?os=1' },
    { id: 2, image: Packed, title: 'Packed', redirect: '/orders?os=2' },
    { id: 3, image: Delivering, title: 'Delivering', redirect: '/orders?os=3' },
    { id: 4, image: Review, title: 'To Review', redirect: '/orders?os=4' },
    {
      id: 5,
      image: Cancel,
      title: 'Return & Cancel',
      redirect: '/orders?os=5',
    },
  ];

  return (
    <>
      <FollowAndWishLists />
      <RecentView />
      <div className='mb-[4rem] px-4'>
        <div className='mt-5'>
          <SectionHeading
            Heading='My Orders'
            ViewAll='More'
            onClickViewMore={() => navigate('/orders')}
            productLength={5}
          />

          <div className='grid grid-cols-5 rounded-[10px] bg-gray-100 px-3 py-4'>
            {ORDER_DATA.map((data) => (
              <div
                key={data.id}
                className='flex flex-col items-center gap-2'
                onClick={() => navigate(data.redirect)}
              >
                <img src={data.image} alt={data.title} className='h-8 w-8' />
                <p className='line-clamp-2 text-center text-xs text-gray-600'>
                  {data.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-5'>
          <p className='mb-2 text-base font-semibold'>Personal Info</p>
          <div className='flex flex-col gap-y-[2px]'>
            <div className='flex items-center gap-x-2 rounded-t-[10px] bg-gray-100 px-4 py-3'>
              <img src={Phone} alt='phone' />
              <p className='text-sm text-gray-800'>095685958</p>
            </div>
            <div className='flex items-center gap-x-2 rounded-b-[10px] bg-gray-100 px-4 py-3'>
              <img src={Location} alt='phone' />
              <p
                className='text-sm text-primary'
                onClick={() => navigate('address')}
              >
                + {t('Me.add-address')}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <p className='mb-2 text-base font-semibold'>Others</p>
          <div className='flex flex-col gap-y-[2px]'>
            <div
              className='flex items-center justify-between rounded-t-[10px] bg-gray-100 px-4 py-3'
              onClick={() => navigate('/changelanguage')}
            >
              <div className='flex items-center gap-x-2'>
                <img src={Translation} alt='phone' />
                <p className='text-sm text-gray-800'>{t('Me.language')}</p>
              </div>
              <ForwardArrow className='w-3.5 fill-gray-400/80' />
            </div>
            <div className='flex items-center justify-between bg-gray-100 px-4 py-3'>
              <div className='flex items-center gap-x-2'>
                <img src={Faq} alt='phone' />
                <p className='text-sm text-gray-800'>FAQs</p>
              </div>
              <ForwardArrow className='w-3.5 fill-gray-400/80' />
            </div>
            <div className='flex items-center justify-between bg-gray-100 px-4 py-3'>
              <div className='flex items-center gap-x-2'>
                <img src={UserGuide} alt='phone' />
                <p className='text-sm text-gray-800'>{t('Me.user-guide')}</p>
              </div>
              <ForwardArrow className='w-3.5 fill-gray-400/80' />
            </div>
            <div className='flex items-center justify-between rounded-b-[10px] bg-gray-100 px-4 py-3'>
              <div className='flex items-center gap-x-2'>
                <img src={Policy} alt='phone' />
                <p className='text-sm text-gray-800'>
                  {t('Me.rules-and-terms-of-use')}
                </p>
              </div>
              <ForwardArrow className='w-3.5 fill-gray-400/80' />
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </>
  );
};

export default MyProfile;
