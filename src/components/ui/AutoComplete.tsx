import { Fragment, ReactNode, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import cn from 'classnames';
import IconChevron from '@/components/icon/IconChevron';
import { insensitiveMatch } from '@/utils/string-utils';
import { useInView } from 'react-intersection-observer';

interface Props<T> {
  options: T[] | null | undefined;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  selected: T | null;
  onSelected: (value: T) => void;
  renderOption: (option: T) => ReactNode;
  getOptionLabel?: (option: T) => string; // default - (option) => option.name ?? option
  onChange: (query: string) => void;
}

const AutoComplete = <T,>({
  options,
  label,
  placeholder = '',
  disabled = false,
  selected,
  onSelected,
  renderOption,
  getOptionLabel = (option: T) => (option as any).name ?? option,
  onChange,
}: Props<T>) => {
  const onQueryChange = onChange;
  const [query, setQuery] = useState('');

  const filteredResult =
    query === ''
      ? options
      : options?.filter((option) =>
          insensitiveMatch(getOptionLabel(option), query)
        );

  return (
    <div className={cn(disabled && 'pointer-events-none opacity-50')}>
      <label className='text-sm'>{label}</label>
      <Combobox value={selected} onChange={onSelected}>
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden rounded-lg border-2 border-gray-300 bg-white text-left shadow-sm focus:outline-none sm:text-sm'>
            <Combobox.Input
              // disabled={disabled}
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none'
              displayValue={getOptionLabel}
              placeholder={placeholder}
              onChange={(e) => {
                onQueryChange(e.target.value);
                setQuery(e.target.value);
              }}
            />
            <Combobox.Button className='absolute inset-0 flex items-center justify-end pr-2'>
              <IconChevron
                className='h-3 w-3 text-gray-400'
                direction='bottom'
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {filteredResult?.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none px-4 py-2'>
                  Nothing found.
                </div>
              ) : (
                filteredResult?.map((value) => renderOption(value))
              )}
              <div className='p-4'>Hello</div>
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default AutoComplete;
