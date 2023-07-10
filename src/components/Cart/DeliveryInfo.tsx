import { DeliveryInfo as IDeliveryInfo } from '@/types';
import IconLocation from '../icon/IconLocation';
import IconPhone from '../icon/IconPhone';
import { useLocation, useNavigate } from 'react-router-dom';

const DeliveryInfo = ({
  info,
  editable = false,
}: {
  info: IDeliveryInfo;
  editable?: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectUrl = encodeURIComponent(
    (location.pathname + location.search).substring(1)
  );

  return (
    <div className='mt-2 rounded-[10px] bg-white'>
      <div className='flex items-center justify-between border-b p-4 py-3'>
        <span className='text-base font-semibold'>Delivery Info</span>
        {editable && (
          <button
            onClick={() => navigate(`/me/address?redirect=${redirectUrl}`)}
            className='text-sm text-gray-400'
          >
            Edit
          </button>
        )}
      </div>
      <div className='p-4 pt-3'>
        <div className='flex items-start gap-2'>
          <IconLocation className='mt-1 text-primary' />
          <div className='flex w-full flex-col text-sm'>
            <span className='font-medium uppercase text-primary'>
              {info?.labelName}
            </span>
            <span>
              {info?.address ? info.address + ',' : null}{' '}
              {info?.townshipName ? info.townshipName + ',' : null}{' '}
              {info?.cityName}
            </span>
            {info?.landmark && (
              <span className='mt-1 flex items-center gap-2 italic text-gray-600'>
                <img src='/img/icons/landmark-icon.svg' alt='' />
                {info.landmark}
              </span>
            )}
          </div>
        </div>
        <div className='mt-2 flex items-center gap-2 text-sm'>
          <IconPhone className='text-custom-green' />
          <span>{info?.phoNo}</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
