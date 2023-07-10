import cn from 'classnames';
import moment from 'moment';
import MessageItem from './MessageItem';
import { orderKeys } from '@/api/order/keys';
import { useQueryClient } from '@tanstack/react-query';
import IconChevron from '@/components/icon/IconChevron';
import { useNavigate, useParams } from 'react-router-dom';
import IconPaperAirplane from '@/components/icon/IconPaperAirplane';
import { useSendOrderMessage } from '@/api/order/order-message-mutation';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGetOrderMessageForAYAZay } from '@/api/order/order-message-query';

const OrderMessage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const inputRef = useRef<null | HTMLTextAreaElement>(null);
  const messageListRef = useRef<null | HTMLDivElement>(null);

  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const { isLoading, data, refetch } = useGetOrderMessageForAYAZay(
    Number(orderId),
    1,
    50
  );
  const { mutate, isLoading: isSending } = useSendOrderMessage({
    onMutate(newMessage) {
      const queryKey = orderKeys.getOrderMessage(Number(orderId), 1, 50);
      const previousMessages = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: any) => {
        const data = { ...old };
        console.log(data);
        if (data.messageLists.length === 0) {
          data.messageLists.push({
            messageDate: new Date().toISOString(),
            messageInfo: [],
          });
        }
        data.messageLists[0].messageInfo.unshift({
          id: 1,
          senderTypeId: newMessage.senderTypeId,
          senderType: 'Buyer',
          orderMessageTypeId: 6,
          orderMessageType: '',
          orderId: newMessage.orderId,
          message: newMessage.message,
          createdDate: new Date().toISOString(),
        });
        return data;
      });
    },
    onSuccess() {
      queryClient.invalidateQueries(
        orderKeys.getOrderMessage(Number(orderId), 1, 50)
      );
    },
  });

  const handleSendMessage = () => {
    if (!message.trim().length) return;
    mutate({
      orderId: Number(orderId),
      message: message.trim(),
      senderTypeId: 2,
    });
    setMessage('');
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = 'auto';
    if (!message.length) return;
    inputRef.current.style.height =
      Math.min(inputRef.current.scrollHeight, 300) + 'px';
  }, [message]);

  useLayoutEffect(() => {
    if (!messageListRef.current) return;
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;

    const observer = new MutationObserver(() => {
      if (!messageListRef.current) return;
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    });
    if (messageListRef) {
      observer.observe(messageListRef.current, {
        childList: true,
      });
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className='flex h-screen flex-col'>
      <div className='sticky inset-x-0 top-0 flex items-center justify-between bg-white px-4 py-3 font-semibold shadow-sm'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2'
        >
          <IconChevron direction='left' />
          Messages{' '}
          {data && data?.total_Results > 0 && <>({data?.total_Results})</>}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            refetch();
          }}
          className='text-sm'
        >
          {/* <IconRefresh className='cursor-pointer fill-slate-500' /> */}
          Refresh
        </button>
      </div>

      <div
        ref={messageListRef}
        className='flex h-full flex-col overflow-hidden overflow-y-auto px-4'
        onClick={() => refetch()}
      >
        {isLoading ? (
          <div className='flex flex-1 items-center justify-center'>
            Loading...
          </div>
        ) : data?.messageLists.length ? (
          <>
            {/* {!reachEnd && (
              <button
                onClick={() => {
                  setSize(size + 1);
                }}
                className="w-full py-1"
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            )} */}
            <div className='flex-1 py-20'></div>
            {[...data.messageLists].reverse().map((msg, idx) => (
              <React.Fragment key={idx}>
                <div className='my-2 flex items-center justify-center gap-2'>
                  {/* <div className='h-[1px] flex-1 bg-gray-300'></div> */}
                  <div className='text-center text-xs text-gray-500'>
                    {new Date(msg.messageDate).toDateString() ===
                    new Date().toDateString()
                      ? 'Today'
                      : moment().diff(moment(msg.messageDate), 'days') === 0
                      ? 'Yesterday'
                      : moment().diff(moment(msg.messageDate), 'days') === 6
                      ? moment(msg.messageDate).format('dddd, ll')
                      : moment().diff(moment(msg.messageDate), 'days') <= 5
                      ? moment(msg.messageDate).format('dddd')
                      : moment(msg.messageDate).fromNow()}
                  </div>
                  {/* <div className='h-[1px] flex-1 bg-gray-300'></div> */}
                </div>
                {[...msg.messageInfo].reverse().map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    isSending={isSending}
                  />
                ))}
              </React.Fragment>
            ))}
          </>
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center gap-1 text-center text-gray-400'>
            {/* <IconMessage className="fill-gray-400" /> */}
            <p className='text-sm'>No Message Yet!</p>
          </div>
        )}
      </div>

      <div className='p-4'>
        <div className='flex items-center overflow-hidden rounded-[18px] bg-gray-100'>
          <textarea
            rows={1}
            ref={inputRef}
            placeholder='Type a message...'
            className='focus-outline-none text-color-default max-h-[8.5rem] flex-1 resize-none overflow-y-auto rounded-xl bg-gray-100 px-3 py-2.5 text-sm outline-none'
            value={message.trim().length ? message : ''}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className='py-2.5' onClick={handleSendMessage}>
            <IconPaperAirplane
              className={cn(
                'mr-2 h-5 w-5',
                message.trim().length ? 'text-blue-500' : 'text-gray-400'
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderMessage;
