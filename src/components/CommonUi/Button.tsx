import React from 'react';
import cn from 'classnames';
import IconLoadingDualRing from '@/assets/svgcomponents/IconLoadingDualRing';
interface ButtonProps {
  action: () => void;
  classProps?: string;
  isLoading?: boolean;
  icon?: string;
  loadingColor: string;
  title: string;
  iconBack?: string;
  isValid?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  action,
  classProps,
  isLoading,
  loadingColor,
  icon,
  iconBack,
  title,
}) => {
  return (
    <button onClick={action} className={cn(classProps)}>
      {isLoading ? (
        <IconLoadingDualRing width={20} height={20} strokeFill={loadingColor} />
      ) : (
        <div className='flex items-center justify-center gap-x-2'>
          {icon && <img src={icon} alt='icon' className='mt-0.5 w-4' />}
          {title}
          {iconBack && <img src={iconBack} alt='icon' className='mt-0.5 w-3' />}
        </div>
      )}
    </button>
  );
};

export default Button;
