import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '@/components/ui/Button';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Drawer({ children, open, onClose }: Props) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className='relative z-10'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-black/30' />
        </Transition.Child>
        <div className='fixed inset-0 flex items-end'>
          <Transition.Child
            as={Dialog.Panel}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='translate-y-full'
            enterTo='-translate-y-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='-translate-y-0'
            leaveTo='translate-y-full'
            className='w-full'
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
