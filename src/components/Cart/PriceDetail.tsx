import { formatNumber } from '@/utils/number-utils';
import cn from 'classnames';

interface Props {
  name: string;
  price: number | string | React.ReactNode;
  isTotal?: boolean;
  isDiscount?: boolean;
}

const PriceDetail = ({
  name,
  price = 0,
  isTotal = false,
  isDiscount = false,
}: Props) => {
  const isNumber = typeof price === 'number';
  return (
    <div
      className={cn('flex items-center justify-between', { 'mt-2': isTotal })}
    >
      <span>{name}</span>
      <span
        className={cn(
          isTotal ? 'text-lg font-bold text-primary' : 'text-inherit'
        )}
      >
        {isDiscount && '-'} {isNumber ? formatNumber(price) : price}{' '}
        {isNumber && 'Ks'}
      </span>
    </div>
  );
};

export default PriceDetail;
