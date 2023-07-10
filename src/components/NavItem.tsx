import cn from 'classnames';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  route: string;
  icon: any;
  iconActive: any;
  active: boolean;
  count: number;
  title: string;
}

const NavItem: FC<Props> = ({
  route,
  icon,
  iconActive,
  active,
  title,
  count,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className='relative w-20 pt-2 text-center'
    >
      {/* <div className='h-6'> */}
      <img
        src={active ? iconActive : icon}
        className='mx-auto h-6 w-6'
        alt=''
      />
      {/* </div> */}
      {count > 0 && (
        <div className='absolute right-5 top-1 flex items-center justify-center rounded-full bg-primary-dark px-1'>
          <p className='text-xs text-white'>{count}</p>
        </div>
      )}
      <span
        className={cn(
          'text-center text-xs',
          active ? 'font-medium text-primary' : 'text-gray-400'
        )}
      >
        {title}
      </span>
    </div>
  );
};

export default NavItem;
