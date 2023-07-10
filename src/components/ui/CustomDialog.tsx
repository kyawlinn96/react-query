import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const CustomDialog: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50' />
        </Transition.Child>

        <div className='fixed inset-0 flex items-center justify-center overflow-y-auto'>
          <Transition.Child
            as={Dialog.Panel}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
            className='m-8 w-full max-w-sm rounded-[10px] bg-white'
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomDialog;
