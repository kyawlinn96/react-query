import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';

// types
import { SearchType } from '@/types';

// api
import { useGetDeliveryAddress } from '@/api/order/delivery-address-query';

// components
import IconMagnifyingGlass from '@/components/icon/IconMagnifyingGlass';

// assets
import DownChveronIcon from '@/assets/svgcomponents/DownChveronIcon';
import LocationIcon from '@/assets/svgcomponents/LocationIcon';
import Landmark from '@/assets/svgcomponents/Landmark';
import InfoIcon from '@/assets/svgcomponents/InfoIcon';
import IconXCircle from './icon/IconXCircle';
import { useConfirmSelectedAddress } from '@/api/order/confirm-address-mutation';
import { toaster } from '@/components/ui/Toast';
import { removeMyanmarSuffix } from '@/utils/removeMyanmarSuffix';
import cn from 'classnames';

const SearchBar = () => {
  const { isLoading, data, isError } = useGetDeliveryAddress();
  const [shownav, setShownav] = useState(false);
  const [showConfirmAddressBox, setShowConfirmAddressBox] = useState(false);

  const navigate = useNavigate();
  const confirmDeliveryAddress = useConfirmSelectedAddress();

  const goToProductSearch = () => {
    navigate('/productsearch', {
      state: { searchType: SearchType.SEARCH_BY_NAME },
    });
  };

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
  if (isError) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.addEventListener('scroll', animateBgNav);
    return () => {
      window.removeEventListener('scroll', animateBgNav);
    };
  }, []);
  const animateBgNav = () => {
    if (window.scrollY === 0) {
      setShownav(true);
    } else {
      setShownav(false);
    }
  };

  return (
    <div className='sticky top-0 z-30  block w-full bg-primary  '>
      <div className='flex flex-col gap-3 px-4 py-2'>
        <div className='flex items-center justify-between'>
          <h2 className='py-2 text-xl font-bold leading-5 text-white'>
            AYAZay
          </h2>

          <button className='rounded-full bg-[#00000050]'>
            <IconXCircle />
          </button>
        </div>
        <div className='relative h-auto w-full' onClick={goToProductSearch}>
          <input
            type='text'
            placeholder='Search Product'
            className='w-full rounded-[10px] px-10 py-2 text-base focus:outline-none focus:ring-2'
          />
          <div className='center-y-axis absolute left-3'>
            <IconMagnifyingGlass className='w-5 fill-gray-800' />
          </div>
          <div className='center-y-axis absolute right-2 rounded-md bg-primary px-3 py-[2px] text-sm text-white'>
            Search
          </div>
        </div>

        <div>
          {!isLoading && (
            <div
              className='mb-2 flex items-center gap-2'
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
              <p className='text-sm text-white'>
                {selectLocation[0]?.townshipName !==
                  'All Township (မြိုနယ်အားလုံး)' && (
                  <span className='inline-block'>
                    {removeMyanmarSuffix(selectLocation[0]?.townshipName)},{' '}
                  </span>
                )}
                <span className='inline-block'>
                  {removeMyanmarSuffix(selectLocation[0]?.cityName)}
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
        </div>
        {showConfirmAddressBox && (
          <div className='my-2 flex w-full flex-col gap-2 transition-all duration-300 ease-in-out'>
            {data?.map((location) => (
              <label
                className='flex items-start justify-start gap-2 py-2'
                key={location?.id}
                onChange={(e) => handleSelectedAddressOption(location)}
              >
                <input
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
                  <p className='text-md  text-left leading-4 text-white'>
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
                      <p className='text-sm text-white '>
                        {location?.landmark}
                      </p>
                    </div>
                  )}
                </div>
              </label>
            ))}

            <div
              className='flex items-center justify-start gap-3'
              onClick={() => navigate('/me/address')}
            >
              <InfoIcon width={18} height={18} fill_one='#FFFFFF' />
              <p className='text-md text-white underline'>
                Want to add new address?
              </p>
            </div>
          </div>
        )}
      </div>
      {!shownav ? null : (
        <div className='-pb-2 relative h-4 w-full rounded-t-2xl bg-white transition-shadow duration-300 ease-in-out' />
      )}
    </div>
  );
};

export default SearchBar;
