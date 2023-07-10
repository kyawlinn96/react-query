import cn from 'classnames';
import { ComponentType, SVGProps } from 'react';
import IconOrderDeleted from '../icon/IconOrderDeleted';

interface Props {
  isDeleted: boolean;
  stepId: number;
  orderStatusId: number;
  cancelStatusId: number;
  IconComponent: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
}

const OrderStep = ({
  isDeleted,
  stepId,
  orderStatusId,
  cancelStatusId,
  IconComponent,
  text,
}: Props) => {
  const shouldShowCancel = cancelStatusId + 1 === stepId;
  const isActiveStep =
    (isDeleted && shouldShowCancel) || (!isDeleted && orderStatusId >= stepId);

  return (
    <div className='relative flex flex-1 flex-col items-center text-primary'>
      <div
        className={cn(
          'absolute left-[calc(-50%_+_20px)] right-[calc(50%_+_20px)] top-[20px] border',
          isActiveStep ? 'border-primary' : 'border-zinc-300'
        )}
      ></div>
      {isDeleted && shouldShowCancel ? (
        <IconOrderDeleted />
      ) : (
        <IconComponent
          className={cn(
            !isDeleted && orderStatusId >= stepId
              ? 'text-primary'
              : 'text-zinc-300'
          )}
        />
      )}
      <span
        className={cn(
          'font-medium',
          isActiveStep ? 'text-primary' : 'text-gray-400'
        )}
      >
        {isDeleted && shouldShowCancel ? 'Deleted' : text}
      </span>
    </div>
  );
};

export default OrderStep;
