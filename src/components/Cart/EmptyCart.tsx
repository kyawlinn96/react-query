import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className='flex h-[calc(100vh_-_104px)] flex-col items-center justify-center gap-2 bg-gray-100 px-8 pb-20'>
      <img src='/img/empty-cart.svg' alt='' />
      <span className='text-lg font-semibold'>
        No Products in Your Cart Yet!
      </span>
      <span className='mb-4 max-w-[314px] text-center text-sm leading-[17px]'>
        Looks like you haven't added anything
        <br /> to your cart yet! Go and explore more products.
      </span>
      <div className='w-full px-4'>
        <Button fullWidth onClick={() => navigate('/')}>
          Go To Shopping
        </Button>
      </div>
    </div>
  );
};

export default EmptyCart;
