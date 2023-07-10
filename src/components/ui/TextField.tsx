import cn from 'classnames';
import * as React from 'react';

interface Props {
  primary?: boolean;
  type?: 'text' | 'number' | 'password';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  value?: string | ReadonlyArray<string> | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  multiline?: boolean;
  maxRows?: number;
}

const sizes = {
  sm: 'py-1.5 px-2.5',
  md: 'py-2 px-2.5',
  lg: 'py-2.5 px-3',
};

export default function TextField({
  primary = false,
  fullWidth,
  className,
  type = 'text',
  value,
  onChange,
  size,
  placeholder,
  startAdornment,
  endAdornment,
  error,
  helperText,
  defaultValue,
  multiline = false,
  maxRows,
  ...props
}: Props) {
  const borderClass = primary
    ? 'border-gray-200 focus-within:border-gray-300'
    : 'border-gray-200 focus-within:border-gray-300';
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // React.useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.style.height = 'auto';
  //     if (!value) {
  //       return;
  //     }

  //     let height = inputRef.current.scrollHeight + 'px';
  //     if (typeof value === 'string' && maxRows) {
  //       const lineHeight = parseInt(
  //         window.getComputedStyle(inputRef.current).lineHeight
  //       );
  //       const maxScrollHeight = maxRows * lineHeight;
  //       if (inputRef.current.scrollHeight > maxScrollHeight) {
  //         height = maxScrollHeight + 'px';
  //         inputRef.current.style.overflowY = 'scroll';
  //       }
  //     }
  //     inputRef.current.style.height = height;
  //   }
  // }, [value, maxRows]);

  return (
    <>
      <div
        className={cn(
          'inline-flex items-center rounded-[10px] border-2 transition-[border-color] duration-100',
          error ? 'border-red-500 focus-within:border-red-500' : borderClass,
          { 'w-full': fullWidth },
          className
        )}
      >
        {startAdornment ? (
          <div className='select-none pl-2'>{startAdornment}</div>
        ) : null}
        <input
          type={type}
          placeholder={placeholder}
          className={cn(
            'w-full border-none bg-inherit text-sm focus:outline-none',
            size ? sizes[size] : 'px-2.5 py-2',
            { 'text-red-500': error }
          )}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          {...props}
        />

        {endAdornment ? (
          <div className='select-none pr-2 opacity-60'>{endAdornment}</div>
        ) : null}
      </div>

      {helperText && (
        <p
          className={cn('mt-[3px] text-xs font-medium leading-relaxed', {
            'text-red-500': error,
          })}
        >
          {helperText}
        </p>
      )}
    </>
  );
}
