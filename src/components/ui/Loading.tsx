import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Props {
  open: boolean;
}
const Loading = ({ open }: Props) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as='div' onClose={() => {}} className='fixed inset-0 z-50'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 -z-10 bg-black/30' />
        </Transition.Child>
        <div className='flex h-full items-center justify-center'>
          <Dialog.Panel>
            <div className='flex flex-col items-center justify-center gap-2 rounded-[10px] bg-black bg-opacity-60 p-4 py-6 text-sm text-white'>
              <img src='/img/loading.gif' className='h-8 w-8' alt='' />
              Loading...
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Loading;
