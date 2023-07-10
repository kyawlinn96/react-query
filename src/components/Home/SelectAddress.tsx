import { useConfirmSelectedAddress } from '@/api/order/confirm-address-mutation';
import { useGetDeliveryAddress } from '@/api/order/delivery-address-query';
import LocationIcon from '@/assets/svgcomponents/LocationIcon';
import { removeMyanmarSuffix } from '@/utils/removeMyanmarSuffix';
import { useState } from 'react';
import { toaster } from '../ui/Toast';
import Landmark from '@/assets/svgcomponents/Landmark';
import InfoIcon from '@/assets/svgcomponents/InfoIcon';
import { useNavigate } from 'react-router-dom';

const SelectAddress = () => {
  const navigate = useNavigate();
  const { isLoading, data, isError } = useGetDeliveryAddress();
  const confirmDeliveryAddress = useConfirmSelectedAddress();

  const [shownav, setShownav] = useState(false);
  const [showConfirmAddressBox, setShowConfirmAddressBox] = useState(false);
  const selectLocation = data?.filter(
    (location) => location?.selected === true
  );

  const handleSelectedAddressOption = (location: any) => {
    const propData = {
      deliveryAddressId: location?.id,
    };
    confirmDeliveryAddress.mutate(propData, {
      onSuccess() {
        setShownav(!shownav);
        toaster.show('Successfully update delivery address');
        setShowConfirmAddressBox(false);
      },
      onError() {
        toaster.show('Fail to update delivery address');
      },
    });
  };

  return (
    <>
      {!isLoading && !isError && (
        <div
          className='mb-2 flex items-center gap-2 px-4 py-1'
          onClick={() => {
            setShowConfirmAddressBox(!showConfirmAddressBox);
            setShownav(!shownav);
          }}
        >
          <LocationIcon
            width={14}
            height={14}
            fill_one='#FFFFFF'
            fill_two='#CF202D'
          />
          <p className='text-xs font-medium text-white'>
            {selectLocation?.[0]?.townshipName !==
              'All Township (မြိုနယ်အားလုံး)' && (
              <span className='inline-block'>
                {removeMyanmarSuffix(selectLocation?.[0]?.townshipName)},{' '}
              </span>
            )}
            <span className='inline-block'>
              {removeMyanmarSuffix(selectLocation?.[0]?.cityName)}
            </span>
          </p>
          <svg
            className={`h-4 w-4 transition-all duration-300 ${
              showConfirmAddressBox && 'rotate-180'
            }`}
            aria-hidden='true'
            fill='none'
            stroke='#FFFFFF'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      )}

      {showConfirmAddressBox && (
        <div className='flex w-full flex-col gap-2 px-4 pb-4 transition-all duration-300 ease-in-out'>
          {data?.map((location) => (
            <div
              className='flex items-start justify-start gap-2 py-2'
              key={location?.id}
            >
              <input
                onChange={(e) => handleSelectedAddressOption(location)}
                value={location?.townshipName}
                checked={location?.selected}
                type='radio'
                className='grid-col-2 mt-1 h-4 w-5 accent-blue-500'
              />
              <div className='mt-1'>
                <LocationIcon
                  width={14}
                  height={14}
                  fill_one='#FFFFFF'
                  fill_two='#CF202D'
                />
              </div>
              <div className=' mt-0.5 flex flex-col  gap-2'>
                <p className='text-md text-left font-medium leading-4 text-white'>
                  {location?.labelName}
                </p>
                <div className='text-left text-sm text-white'>
                  {location?.townshipName !==
                    'All Township (မြိုနယ်အားလုံး)' && (
                    <span className='inline-block'>
                      {removeMyanmarSuffix(location?.townshipName)},{' '}
                    </span>
                  )}
                  <span className='inline-block'>
                    {removeMyanmarSuffix(location?.cityName)},{'  '}
                  </span>
                  <span className='inline-block'>
                    {removeMyanmarSuffix(location?.address)}
                  </span>
                </div>
                {location?.landmark !== '' && (
                  <div className='flex items-center justify-start gap-2'>
                    <Landmark width={10} height={10} fill_one='#FFFFFF' />
                    <p className='text-sm text-white '>{location?.landmark}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div
            className='flex items-center justify-start gap-3'
            onClick={() => navigate('/me/address')}
          >
            <InfoIcon width={18} height={18} fill_one='#FFFFFF' />
            <p className='text-sm text-white underline'>
              Want to add new address?
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectAddress;
