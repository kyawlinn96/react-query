import cn from 'classnames';
import { SVGProps } from 'react';

const IconArrow = ({
  direction,
  className,
  ...rest
}: SVGProps<SVGSVGElement> & {
  direction?: 'top' | 'right' | 'bottom' | 'left';
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='10'
      height='8'
      fill='none'
      viewBox='0 0 10 8'
      className={cn(
        className,
        { 'rotate-90': direction === 'bottom' },
        { 'rotate-180': direction === 'left' },
        { '-rotate-90': direction === 'top' }
      )}
      {...rest}
    >
      <path
        fill='currentColor'
        d='M6.53.66a.754.754 0 00-1.06 0c-.29.29-.29.77 0 1.06L7 3.25H.89a.749.749 0 100 1.5h6.1L5.46 6.27c-.29.29-.29.77 0 1.06.15.15.34.22.53.22.2 0 .39-.07.53-.22l2.8-2.79.02-.02.52-.52L6.53.66z'
      ></path>
    </svg>
  );
};

export default IconArrow;
