import { insensitiveMatch } from '@/utils/string-utils';
import { useState } from 'react';
import IconXMark from '../icon/IconXMark';
import Drawer from '../ui/Drawer';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data:
    | {
        id: number;
        name: string;
      }[]
    | undefined;
  onSelect: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
    }>
  >;
}

const AddressDrawer = ({ open, setOpen, data, onSelect }: Props) => {
  const [filter, setFilter] = useState('');
  const list = data?.filter((d) => insensitiveMatch(d.name, filter));

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      // anchor='bottom'
    >
      <div className='rounded-t-2xl bg-white p-4'>
        <button
          onClick={() => setOpen(false)}
          className='ml-auto block p-2 pb-4'
        >
          <IconXMark />
        </button>
        <input
          type='text'
          placeholder='Search city...'
          className='w-full bg-gray-100 px-4 py-2 focus:outline-none'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className='mt-4 h-80 overflow-y-auto'>
          {list?.map((d) => (
            <div
              key={d.id}
              className='border-b px-4 py-3 font-medium'
              onClick={() => {
                onSelect(d);
                setOpen(false);
              }}
            >
              {d.name}
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default AddressDrawer;
