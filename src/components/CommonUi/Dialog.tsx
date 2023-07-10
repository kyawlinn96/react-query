import cn from 'classnames';
import { IconCross } from '@/components/icon/IconCross';
import { useEffect, useRef } from 'react';
import Portal from './Portal';

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  fullWidth?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  open?: boolean;
  onClose: () => void;
  scroll?: boolean;
  unStyled?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  className,
  fullWidth = true,
  size = 'sm',
  open,
  onClose = (e: KeyboardEvent) => {},
  scroll,
  unStyled,
}) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      e.key === 'Escape' ? onClose(e) : null;
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <>
      <Portal>
        <div
          ref={nodeRef}
          className='min-w-screen fixed inset-0 z-50 h-screen bg-cover bg-center bg-no-repeat outline-none focus:outline-none'
        >
          <div
            className='bg-black-50 absolute inset-0 z-[-1]'
            aria-hidden='true'
          ></div>

          <div
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                onClose(e);
              }
            }}
            className={cn(
              'h-full text-center',
              scroll ? 'overflow-y-auto' : 'flex items-center justify-center'
            )}
          >
            <div
              className={cn(
                'm-8 inline-block rounded-lg text-left',
                {
                  'flex max-h-[calc(100vh_-_64px)] flex-col': !scroll,
                  'bg-primary-bg dark:bg-primary-bg-dark': !unStyled,
                  'max-w-[calc(100%_-_64px)]': !size,
                  'max-w-[444px]': size === 'xs',
                  'max-w-[600px]': size === 'sm',
                  'max-w-[900px]': size === 'md',
                  'max-w-[1200px]': size === 'lg',
                  'w-[calc(100%_-_64px)]': fullWidth,
                },
                className
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};
export default Dialog;

export function DialogTitle({
  className,
  children,
  onClose,
  ...rest
}: React.HTMLAttributes<HTMLHeadElement> & { onClose: () => void }) {
  return (
    <h2
      className={cn(
        'flex items-center justify-between p-4 text-lg font-semibold',
        className
      )}
      {...rest}
    >
      {children}
      <button
        onClick={onClose}
        className='-m-2 ml-auto rounded-md p-2 hover:bg-gray-100'
      >
        <IconCross className='h-4 w-4' />
      </button>
    </h2>
  );
}

export function DialogContent({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadElement>) {
  return (
    <div
      className={cn('flex-1 overflow-y-auto px-6 py-4', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function DialogAction({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLHeadElement>) {
  return (
    <div
      className={cn('flex items-center justify-end gap-2 p-4', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
