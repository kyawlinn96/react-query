import React from 'react';
import { WishListsProps } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
import IconHeart from '@/components/icon/IconHeart';
import { useUpdateWishList } from '@/api/myaccount/myaccount-update-whishlists';
import { toast } from 'react-toastify';

interface WishListItemProps {
  wishListData: WishListsProps[];
}
const WishListItem = ({ wishListData }: WishListItemProps) => {
  const navigate = useNavigate();
  const updateWishList = useUpdateWishList();

  const handleRemoveWishList = (productData: WishListsProps) => {
    const postData = {
      productId: Number(productData.productId),
      isFav: !productData.isFav,
    };
    updateWishList.mutate(postData, {
      onSuccess() {
        toast.success(updateWishList.data?.message);
      },
      onError() {
        toast.error('Fail to update wishlists');
      },
    });
  };
  return (
    <div className='flex w-full flex-col gap-2 px-4'>
      {wishListData?.map((wishlist) => (
        <div
          className='flex h-28 w-full justify-between  gap-4 rounded-xl bg-white p-2'
          onClick={(e) => navigate(`/productdetail/${wishlist?.productId}`)}
        >
          <div className='h-full w-24'>
            <img
              src={wishlist?.url}
              alt='productphoto'
              className='h-full w-full rounded-xl'
            />
          </div>
          <div className='flex grow flex-col items-start  py-1'>
            {wishlist?.promotePercent > 0 && (
              <div className='bg-primary-dark px-2 text-sm text-white'>
                {wishlist?.promotePercent} %
              </div>
            )}
            <h4 className='text-md mt-1 w-[18ch] truncate font-medium text-black'>
              {wishlist?.name}
            </h4>
            <div className=''>
              {wishlist?.promotePercent > 0 ? (
                <div className='flex items-center justify-between gap-4'>
                  <span className='text-md font-semibold text-primary'>
                    {wishlist?.originalPrice.toLocaleString()}{' '}
                  </span>
                  -
                  <span className='text-md font-semibold text-gray-400 line-through'>
                    {wishlist?.promotePrice}
                  </span>
                </div>
              ) : (
                <div className='flex items-center justify-between gap-4'>
                  <span className='text-md font-semibold text-primary'>
                    {wishlist?.originalPrice.toLocaleString()} Ks{' '}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div
            className='w-8 cursor-pointer pt-1'
            onClick={(event) => {
              event.stopPropagation();
              handleRemoveWishList(wishlist);
            }}
          >
            <IconHeart className='w-7 fill-red-500' />
          </div>
        </div>
      ))}
    </div>
  );
};
export default WishListItem;
