import Button from '@/components/CommonUi/Button';

import FollowTik from '@/assets/follow_tik_white.svg';
import React from 'react';

import { useShopLandingFollowShopStatusStatus } from '@/api/shop-landing/follow-shop-status';
import { ShopDetailByShopResponse } from '@/types';
import { useNavigate } from 'react-router-dom';
import { toaster } from '@/components/ui/Toast';
import IconWarning from '@/components/icon/IconWarning';

interface ShopLandingFollowShopStatusProps {
  shopData: ShopDetailByShopResponse;
}

const ShopLandingFollowShopStatus: React.FC<
  ShopLandingFollowShopStatusProps
> = ({ shopData }) => {
  const navigate = useNavigate();
  const { mutate, data, isLoading } = useShopLandingFollowShopStatusStatus();

  const goToOrder = () => {
    navigate(
      `/orders?shopId=${shopData?.shopId}&shopName=${shopData?.shopName}`
    );
  };
  const handleFollow = () => {
    const followShopLandingInfo = {
      shopId: shopData?.shopId,
      followStatus: !shopData?.isFollowed,
    };
    mutate(followShopLandingInfo, {
      onSuccess() {
        if (shopData?.isFollowed) {
          toaster.show('Shop Unfollowed successfully');
        }
        if (!shopData?.isFollowed) {
          toaster.show('Followed shop successfully');
        }
      },
      onError() {
        toaster.show('Something went wrong!');
      },
    });
  };
  const formatCount = (count: number) => {
    if (count >= 100000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 10000) {
      return (count / 1000).toFixed(1) + 'K';
    } else if (count >= 1000) {
      return Math.floor(count / 1000) + 'K';
    } else {
      return count.toString();
    }
  };

  return (
    <div className='flex flex-col '>
      <div className=' flex h-auto w-full bg-white p-3'>
        <div className='flex w-2/5 items-center justify-center gap-2'>
          {shopData?.followerCount > 0 && (
            <>
              <div className='flex'>
                {shopData?.followerProfileList?.map((user) => (
                  <div
                    className='avatar h-8 w-8 rounded-full object-contain'
                    key={user?.userId}
                  >
                    <img
                      src={user?.url}
                      alt='user avatar'
                      className='h-full w-full rounded-full'
                    />
                  </div>
                ))}
              </div>

              <p className='text-center text-sm leading-4'>
                <span className='block  font-semibold'>
                  {formatCount(shopData?.followerCount)}
                </span>
                Followers
              </p>
            </>
          )}
        </div>
        <div className='flex w-3/5 items-center  justify-end gap-2 px-2 text-base font-medium'>
          <Button
            action={goToOrder}
            title='Orders'
            loadingColor='#CF202D'
            classProps='border-2 border-primary bg-white h-8 min-w-2/4 flex justify-center items-center text-sm rounded-md text-primary py-2 px-4'
          />
          <Button
            action={handleFollow}
            isLoading={isLoading}
            icon={shopData?.isFollowed ? FollowTik : ''}
            title={shopData?.isFollowed ? 'Followed' : 'Follow'}
            loadingColor='#FFF'
            classProps='border-2 border-primary flex justify-center items-center h-8 min-w-2/4 bg-primary text-sm rounded-md text-white py-2 px-4'
          />
        </div>
      </div>
      {!shopData?.isShopAviable && (
        <div className='mx-4 mb-2 flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-2'>
          <IconWarning className='w-6' />
          <p className='text-sm font-medium text-primary-dark'>
            This shop has temporarily closed!
          </p>
        </div>
      )}
    </div>
  );
};

export default ShopLandingFollowShopStatus;
