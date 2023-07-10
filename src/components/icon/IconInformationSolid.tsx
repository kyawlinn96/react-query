import { SVGProps } from 'react';

const IconInformationSolid = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='7' cy='7' r='7' fill='currentColor' />
      <rect x='6' y='6' width='2' height='5' fill='white' />
      <circle cx='7' cy='4' r='1' fill='white' />
    </svg>
  );
};
export default IconInformationSolid;
