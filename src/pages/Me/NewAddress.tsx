import {
  useGetCity,
  useGetTownship,
} from '@/api/miscellaneous/city-and-township-query';
import {
  useCreateUserDeliveryAddress,
  useUpdateUserDeliveryAddress,
} from '@/api/order/delivery-address-mutation';
import { useGetDeliveryAddress } from '@/api/order/delivery-address-query';
import AddressDrawer from '@/components/SelectAddress/AddressDrawer';
import IconChevron from '@/components/icon/IconChevron';
import IconInformationSolid from '@/components/icon/IconInformationSolid';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { toaster } from '@/components/ui/Toast';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Btn = ({
  text,
  active,
  onClick,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn(
        'h-full rounded-full px-3 text-sm font-semibold uppercase transition-all duration-200',
        active ? 'grow bg-primary text-white' : 'bg-gray-100 text-gray-600'
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const NewAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const redirectPage = searchParams.get('redirect');

  const editAddress = location.state?.editAddress;

  const [showCity, setShowCity] = useState(false);
  const [showTownship, setShowTownShip] = useState(false);

  const [city, setCity] = useState({
    id: editAddress?.cityId || 0,
    name: editAddress?.cityName || '',
  });
  const [township, setTownship] = useState({
    id: editAddress?.townshipId || 0,
    name: editAddress?.townshipName || '',
  });
  const [info, setInfo] = useState({
    labelName: editAddress?.labelName || 'Home',
    address: editAddress?.address || '',
    landmark: editAddress?.landmark || '',
  });

  const { data: addressList } = useGetDeliveryAddress();
  const { data: cityList } = useGetCity();
  const { data: townShipList } = useGetTownship(city.id);
  const { mutate, isLoading } = useCreateUserDeliveryAddress();
  const { mutate: updateAddress, isLoading: isUpdating } =
    useUpdateUserDeliveryAddress();
  const hasTownship = townShipList && townShipList.length > 1;
  const hasHomeAddress = addressList?.find(
    (address) => address.labelName === 'Home'
  );

  useEffect(() => {
    if (townShipList?.length === 1) {
      setTownship(townShipList[0]);
    }
  }, [townShipList]);

  const onSuccess = () => {
    redirectPage
      ? navigate(`/${redirectPage}`, { replace: true })
      : navigate('/me/address', { replace: true });
  };
  const onSave = () => {
    if (!city.id || (hasTownship && !township.id) || !info.address) {
      toaster.show('Please fill all required informations.');
      return;
    }
    if (editAddress?.id) {
      updateAddress(
        {
          id: editAddress.id,
          cityId: city.id,
          townshipId: township.id,
          labelName: info.labelName,
          address: info.address,
          landmark: info.landmark,
        },
        {
          onSuccess,
        }
      );
    } else {
      mutate(
        {
          cityId: city.id,
          townshipId: township.id,
          labelName: info.labelName,
          address: info.address,
          landmark: info.landmark,
        },
        {
          onSuccess,
        }
      );
    }
  };

  return (
    <>
      <div className='flex items-center justify-between px-4 py-3'>
        <button onClick={() => navigate(-1)}>
          <IconChevron />
        </button>
        <div className='text-lg font-medium'>Add New Address</div>
        <div>&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div className='px-6'>
        <div className='flex h-20 items-center gap-2 py-4 text-center'>
          {['Home', 'Work', 'Other'].map((e, idx) => (
            <Btn
              key={e}
              text={e}
              active={info.labelName === e}
              onClick={() => setInfo({ ...info, labelName: e })}
            />
          ))}
        </div>
        {hasHomeAddress && info.labelName === 'Home' && (
          <div className='my-2 mb-4 flex items-start gap-2 rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-500'>
            <IconInformationSolid className='mt-2 h-4 w-4 shrink-0' />
            <p>
              "Home" ဖြင့် အခြားလိပ်စာတစ်ခုအား ရွေးချယ်ထားပြီး ဖြစ်သည်။
              ယခုထည့်သွင်းနေသော လိပ်စာအသစ်အား "Home" အဖြစ်ပြောင်းလဲရန်
              သေချာပါသလား?
            </p>
          </div>
        )}
        <div className='flex flex-col gap-4'>
          <button
            onClick={() => setShowCity(true)}
            className='flex w-full items-center justify-between gap-2 rounded-md border border-black/30 p-4 text-sm'
          >
            <span></span>
            <span>{city.id ? city.name : 'Select City'}</span>
            <IconChevron direction='bottom' />
          </button>
          {city.id && hasTownship ? (
            <button
              onClick={() => setShowTownShip(true)}
              className='flex w-full items-center justify-between gap-2 rounded-md border border-black/30 p-4 text-sm'
            >
              <span></span>
              <span>{township.name ? township.name : 'Select Township'}</span>
              <IconChevron direction='bottom' />
            </button>
          ) : null}

          <textarea
            rows={4}
            className='rounded-md border border-black/30 px-4 py-2 focus:outline-none'
            placeholder='Address'
            value={info.address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
          />
          <div>
            <input
              type='text'
              className='w-full rounded-md border border-black/30 px-4 py-3 focus:outline-none'
              placeholder='Popular places near you'
              value={info.landmark}
              onChange={(e) => setInfo({ ...info, landmark: e.target.value })}
            />
            <p className='pt-2 text-sm'>e.g. မြို့မစျေးအရှေ့</p>
          </div>
        </div>

        <div className='mt-4 flex justify-center gap-3'>
          <Button color='secondary' fullWidth onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button fullWidth loading={isLoading || isUpdating} onClick={onSave}>
            Save
          </Button>
        </div>
      </div>

      <AddressDrawer
        open={showCity}
        setOpen={setShowCity}
        data={cityList}
        onSelect={(city) => {
          setCity(city);
          setTownship({ id: 0, name: '' });
        }}
      />
      <AddressDrawer
        open={showTownship}
        setOpen={setShowTownShip}
        data={townShipList}
        onSelect={(township) => setTownship(township)}
      />

      <Loading open={isLoading || isUpdating} />
    </>
  );
};

export default NewAddress;
