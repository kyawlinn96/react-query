import { ShopInfo as IShopInfo } from '@/types';
import { useNavigate } from 'react-router-dom';
import placeholderImg from '@/assets/placeholder.svg';

const ShopInfo = ({ info }: { info: IShopInfo }) => {
  const navigate = useNavigate();

  return (
    <div className='mt-2 rounded-[10px] bg-white'>
      <div className='flex items-center justify-between border-b p-4 py-3'>
        <span className='text-base font-bold'>Shop Info</span>
      </div>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-4'>
          <img
            src={info.shopImageUrl || placeholderImg}
            alt=''
            className='h-11 w-11 rounded-full'
          />
          <span className='text-base font-medium'>{info.shopName}</span>
        </div>
        <button
          onClick={() => navigate(`/shops/${info.shopId}`)}
          className='rounded-md bg-primary-light px-4 py-1 text-sm font-medium text-primary'
        >
          Visit
        </button>
      </div>
    </div>
  );
};

export default ShopInfo;
