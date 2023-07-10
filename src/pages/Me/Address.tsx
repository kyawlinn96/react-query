import { useConfirmSelectedAddress } from '@/api/order/confirm-address-mutation';
import { useDeleteUserDeliveryAddress } from '@/api/order/delivery-address-mutation';
import { useGetDeliveryAddress } from '@/api/order/delivery-address-query';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import IconChevron from '@/components/icon/IconChevron';
import IconEdit from '@/components/icon/IconEdit';
import IconLocation from '@/components/icon/IconLocation';
import IconTrash from '@/components/icon/IconTrash';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { toaster } from '@/components/ui/Toast';

const Address = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPage = searchParams.get('redirect');

  const [selectedAddress, setSelectedAddress] = useState(0);

  const { isLoading, data, isRefetching } = useGetDeliveryAddress();
  const { mutate, isLoading: isUpdating } = useConfirmSelectedAddress();
  const { mutate: deleteAddress, isLoading: isDeleting } =
    useDeleteUserDeliveryAddress();

  const onChangeAddress = (id: number) => {
    mutate(
      // why productCart[] is required to change deli address??
      // check hook function for further info
      { deliveryAddressId: id },
      {
        onSuccess() {
          console.log(redirectPage);
          redirectPage ? navigate(`/${redirectPage}`) : navigate(-1);
        },
      }
    );
  };

  const onDelete = (address: any) => {
    if (address.selected) {
      toaster.show(`You can't delete selected address.`);
    } else {
      setSelectedAddress(address.id);
    }
  };

  const handleDelete = () => {
    deleteAddress(
      { id: selectedAddress },
      {
        onSuccess() {
          setSelectedAddress(0);
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className='sticky inset-x-0 top-0 z-[1] flex items-center justify-between bg-white px-4 py-3 shadow-sm'>
        <button onClick={() => navigate(-1)}>
          <IconChevron />
        </button>
        <div className='text-lg font-medium'>Select Address</div>
        <div>&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div className='px-6'>
        {data?.map((address) => (
          <div
            onClick={() => onChangeAddress(address.id)}
            key={address.id}
            className='flex items-start gap-2 py-4'
          >
            <div className='mt-1 shrink-0 pr-1'>
              {address.labelName === 'Home' ? (
                <img
                  src='/img/icons/home-icon.svg'
                  className='h-4 w-4'
                  alt=''
                />
              ) : address.labelName === 'Work' ? (
                <img
                  src='/img/icons/work-bag-icon.svg'
                  className='h-4 w-4'
                  alt=''
                />
              ) : (
                <IconLocation className='h-4 w-4 text-primary' />
              )}
            </div>
            <div className='flex grow flex-col text-sm'>
              <span className='text-base font-medium uppercase'>
                {address.labelName}
              </span>
              <span>
                {address.address}, {address.townshipName}, {address.cityName}
              </span>
              {address.landmark && (
                <div className='flex items-center gap-2'>
                  <img src='/img/icons/landmark-icon.svg' alt='' />{' '}
                  {address.landmark}
                </div>
              )}
            </div>
            <div className='mt-2 flex items-start gap-4'>
              <input
                type='radio'
                className='mt-1 h-3.5 w-3.5'
                checked={address.selected}
                readOnly
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('new', {
                    state: {
                      editAddress: address,
                    },
                  });
                }}
              >
                <IconEdit />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(address);
                }}
              >
                <IconTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='sticky bottom-0 flex justify-center bg-white p-4'>
        <Button
          fullWidth
          onClick={() =>
            navigate(redirectPage ? `new?redirect=${redirectPage}` : 'new')
          }
        >
          Add New Address
        </Button>
      </div>

      <ConfirmDialog
        open={Boolean(selectedAddress)}
        title='Are you sure?'
        description='You want to delete this address?'
        isLoading={isDeleting}
        onCancel={() => setSelectedAddress(0)}
        onConfirm={handleDelete}
      />

      {/* <Toast content='Hello world' /> */}
      <Loading open={isLoading || isRefetching || isUpdating} />
    </>
  );
};

export default Address;
