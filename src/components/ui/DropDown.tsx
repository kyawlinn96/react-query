import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import IconChevron from '../icon/IconChevron';
import cn from 'classnames';

interface Props<T> {
  options: T[];
  value: string;
  renderOption: (option: T) => ReactNode;
}

const DropDown = <T,>({ options, value, renderOption }: Props<T>) => {
  return (
    <Menu as='div' className='relative inline-block w-full text-left'>
      {({ open }) => (
        <>
          <Menu.Button
            as='div'
            className={cn(
              'inline-flex w-full items-center justify-between rounded-[10px] border-2 px-2.5 py-2 text-sm text-gray-600 transition-[border-color] duration-100',
              open ? 'border-gray-300' : 'border-gray-200'
            )}
          >
            {value}
            <IconChevron
              aria-hidden='true'
              direction={open ? 'top' : 'bottom'}
              className='h-3 w-3'
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute inset-x-0 z-50 mt-1 min-w-max origin-top divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {options.map((option) => (
                <Menu.Item>{renderOption(option)}</Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default DropDown;
