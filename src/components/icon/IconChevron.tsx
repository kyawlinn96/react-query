import cn from 'classnames';
import { SVGProps } from 'react';

const IconChevron = ({
  direction,
  className,
  ...rest
}: SVGProps<SVGSVGElement> & {
  direction?: 'top' | 'right' | 'bottom' | 'left';
}) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(
        className,
        { 'rotate-90': direction === 'top' },
        { 'rotate-180': direction === 'right' },
        { '-rotate-90': direction === 'bottom' }
      )}
      {...rest}
    >
      <g clipPath='url(#clip0_26_6900)'>
        <path
          d='M13.49 18.1301C13.3 18.1301 13.11 18.0601 12.96 17.9101L6.27002 11.2101C5.95002 10.8801 5.77002 10.4501 5.77002 9.99006C5.77002 9.53006 5.95002 9.10006 6.27002 8.77006L12.96 2.09006C13.25 1.80006 13.73 1.80006 14.02 2.09006C14.31 2.38006 14.31 2.86006 14.02 3.15006L7.33002 9.84006C7.24002 9.93006 7.24002 10.0701 7.33002 10.1501L14.02 16.8501C14.31 17.1401 14.31 17.6201 14.02 17.9101C13.87 18.0601 13.68 18.1301 13.49 18.1301Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_26_6900'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconChevron;
