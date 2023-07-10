import { on, remove } from '@/utils/eventBus';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

const Toast = () => {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    on('toast', (msg) => {
      setMessage(msg);
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 1500);

      return () => {
        remove('toast', () => {});
      };
    });
  }, []);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={() => setShow(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-10' />
        </Transition.Child>

        <div className='fixed inset-0 flex items-center justify-center overflow-y-auto'>
          <Transition.Child
            as={Dialog.Panel}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='rounded-md bg-black/80 px-4 py-2 text-sm text-white'>
              {message}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Toast;
