const DeliveryService = () => {
  return (
    <div className='mt-2 rounded-[10px] bg-white'>
      <div className='flex items-center justify-between border-b p-4 py-3'>
        <span className='text-base font-semibold'>Delivery Service</span>
      </div>
      <div className='flex items-start gap-4 p-4 pt-3'>
        <img src='/img/mock/aya-deli.png' alt='' />
        <div className='flex flex-col text-sm'>
          <span className='font-medium'>AYA Deli</span>
          <span>095685988</span>
          <span className='text-primary'>2,500 Ks (3-5 Days)</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryService;
