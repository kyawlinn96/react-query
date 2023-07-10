import { svgIcon } from '@/types';

const PlaceHolderIcon = (props: svgIcon) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox='0 0 150 150'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='150' height='150' fill='#2E6EFF' />
    </svg>
  );
};

export default PlaceHolderIcon;
