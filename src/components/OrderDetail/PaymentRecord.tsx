import { commonDateFormat } from '@/utils/date-utils';

const PaymentRecord = ({ date }: { date: string }) => {
  return (
    <div className='mt-2 rounded-[10px] bg-white'>
      <div className='flex items-center justify-between border-b p-4 py-3'>
        <span className='text-base font-semibold'>Payment Record</span>
      </div>
      <div className='flex items-center justify-between p-4 text-sm'>
        <span className='text-gray-600'>Date</span>
        <span className='text-gray-800'>{commonDateFormat(date)}</span>
      </div>
    </div>
  );
};

export default PaymentRecord;
