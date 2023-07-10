// import defaultImg from 'assets/Authentication/Register/user_profile.svg';
import cn from 'classnames';
import moment from 'moment';
import placeHolder from '@/assets/placeholder.svg';
import { SyntheticEvent } from 'react';

interface Props {
  message: {
    id: number;
    senderTypeId: number;
    senderType: string;
    senderName: string;
    profileUrl: string | null;
    messageType: 'Sender' | 'Buyer';
    orderMessageTypeId: number;
    orderMessageType: string;
    orderId: number;
    message: string;
    createdDate: string;
    createdBy: number;
  };
  isSending: boolean;
}

const MessageItem = ({ message, isSending }: Props) => {
  return (
    <div key={message.id} className='flex gap-2 pb-2 pt-1'>
      {message.senderTypeId === 1 ? (
        <img
          src={message.profileUrl || placeHolder}
          className='h-10 w-10 rounded-full'
          alt=''
          onError={(e: SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeHolder;
          }}
        />
      ) : null}
      <div
        className={cn('flex w-full flex-col gap-1', {
          'ml-auto items-end': message.senderTypeId === 2,
        })}
      >
        <div className='text-sm'>
          <span className='font-semibold'>
            {message.senderTypeId === 1 ? message.senderName : 'You'}
          </span>
          {message.orderMessageType && (
            <span className='text-gray-500'>
              &nbsp;• {message.orderMessageType}
            </span>
          )}
        </div>

        <div
          className={cn(
            'w-fit max-w-[80%] rounded-xl px-2 py-1.5 text-start text-[15px]',
            message.senderTypeId === 1
              ? 'text-color-default rounded-tl-none bg-gray-200'
              : 'rounded-tr-none bg-blue-500 text-white'
          )}
        >
          <div className='whitespace-pre-wrap break-words'>
            {message.message}
          </div>
        </div>

        <div className='text-xs text-gray-600'>
          {isSending ? 'sending' : moment(message.createdDate).format('LT')}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
