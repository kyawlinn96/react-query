import { OrderDeliveryInfo as IOrderDeliveryInfo } from '@/types';
import IconLocation from '../icon/IconLocation';
import IconPhone from '../icon/IconPhone';

const OrderDeliveryInfo = ({ info }: { info: IOrderDeliveryInfo }) => {
  return (
    <div className='mt-2 rounded-[10px] bg-white'>
      <div className='flex items-center justify-between border-b p-4 py-3'>
        <span className='text-base font-semibold'>Delivery Info</span>
      </div>
      <div className='p-4 pt-3'>
        <div className='flex items-start gap-2'>
          <IconLocation className='mt-1 text-primary' />
          <div className='flex w-full flex-col text-sm'>
            <span className='font-medium text-primary'>HOME</span>
            <span>
              {info.address ? info.address + ',' : null}{' '}
              {/* {info.townshipName ? info.townshipName + ',' : null}{' '} */}
              {info.cityName}
            </span>
            {info.landMark && (
              <span className='mt-1 flex items-center gap-2 italic text-gray-600'>
                <img src='/img/icons/landmark-icon.svg' alt='' />
                {info.landMark}
              </span>
            )}
          </div>
        </div>
        {info.phNo && (
          <div className='mt-1 flex items-center gap-2 text-sm'>
            <IconPhone className='text-custom-green' />
            <span>{info.phNo}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDeliveryInfo;
