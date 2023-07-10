import {
  GetNotificationResponse,
  useGetNotificationBuyer,
  useSeenNotification,
} from '@/api/order/notification-query';
import BottomNavigation from '@/components/BottomNavigation';
import { commonDateFormat } from '@/utils/date-utils';
import cn from 'classnames';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from './Loading';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { orderKeys } from '@/api/order/keys';

const Message = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetNotificationBuyer(10);
  const { mutate } = useSeenNotification();
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const onItemClick = (msg: GetNotificationResponse) => {
    mutate(msg.id, {
      onSuccess() {
        console.log('mutate success');
        const prevData = queryClient.getQueryData(
          orderKeys.getNotificationBuyer(10)
        );
        console.log(prevData);
      },
    });
    switch (msg.redirectAction) {
      case 'GetOrderDetail':
        navigate(`/orders/${msg.referenceAttribute}`);
        break;
      case 'GetOrderMessage':
        navigate(`/orders/${msg.referenceAttribute}/messages`);
        break;
      default:
        break;
    }
  };

  const messages = data?.pages.flatMap((page) => page);

  return (
    <>
      <div className='sticky inset-x-0 top-0 z-40 flex h-12 items-center justify-between bg-white px-4 py-3'>
        <h3 className='text-xl font-semibold'>Messages</h3>
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Error</div>
      ) : (
        <>
          {messages?.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-4 p-4',
                message.isSeen ? 'bg-white' : 'bg-gray-200'
              )}
              onClick={() => onItemClick(message)}
            >
              <img
                src='/img/mock/aya-deli.png'
                className='mt-2 h-12 w-12 rounded-md'
                alt=''
              />
              <div className='flex flex-col text-sm'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(message.body),
                  }}
                ></div>
                <span className='text-sm text-gray-500'>
                  {commonDateFormat(message.notificationDate)}
                </span>
              </div>
            </div>
          ))}
          <div ref={ref} className='p-4 text-center text-sm text-gray-400'>
            {isFetchingNextPage ? 'Loading...' : 'No more messages.'}
          </div>
        </>
      )}
      <div className='my-20'></div>
      <BottomNavigation />
    </>
  );
};

export default Message;
