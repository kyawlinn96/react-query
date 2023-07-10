import IconLoadingDualRing from '@/assets/svgcomponents/IconLoadingDualRing';
import React from 'react';

interface LoadingProps {
  width: number;
  height: number;
  loadingColor: string;
  children?: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({
  width,
  height,
  loadingColor,
  children,
}) => {
  return (
    <div className='flex h-[70vh] w-full items-center justify-center'>
      <IconLoadingDualRing
        width={width}
        height={height}
        strokeFill={loadingColor}
      />
      {children}
    </div>
  );
};

export default Loading;
