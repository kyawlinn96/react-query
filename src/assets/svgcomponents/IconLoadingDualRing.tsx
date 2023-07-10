import { FC } from 'react';

interface Props {
  width: number;
  height: number;
  strokeFill: string;
}

const IconLoadingDualRing: FC<Props> = ({ width, height, strokeFill }) => {
  const svgStyle: React.CSSProperties = {
    background: 'transparent',
    shapeRendering: 'auto',
  };
  return (
    <svg
      style={svgStyle}
      width={width}
      height={height}
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <circle
        cx='50'
        cy='50'
        r='32'
        strokeWidth='8'
        stroke={strokeFill}
        strokeDasharray='50.26548245743669 50.26548245743669'
        fill='none'
        strokeLinecap='round'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='1s'
          keyTimes='0;1'
          values='0 50 50;360 50 50'
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default IconLoadingDualRing;
