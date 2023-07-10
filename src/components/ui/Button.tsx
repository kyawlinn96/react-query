import cn from 'classnames';
import React from 'react';

interface Props {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  color?: 'primary' | 'secondary';
}

const Button: React.FC<Props> = ({
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  className,
  color = 'primary',
}) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center rounded-[10px] px-4 py-3 text-sm font-medium focus:outline-none active:opacity-70 disabled:opacity-70',
        fullWidth && 'w-full',
        { 'bg-primary text-white': color === 'primary' },
        { 'bg-gray-100 text-gray-600': color === 'secondary' },
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <img src='/img/loading.gif' className='h-4 w-4' alt='' />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
