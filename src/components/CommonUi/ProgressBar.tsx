import React, { useState } from 'react';
import { useEffect } from 'react';

interface quantityProps {
  totalQuantity: number;
  leftQuantity: number;
}

export const ProgressBar: React.FC<quantityProps> = ({
  totalQuantity,
  leftQuantity,
}) => {
  const [progress, setProgress] = useState(0);

  // Calculate the progress percentage based on the total and left quantity
  const progressPercent = Math.round(
    ((totalQuantity - leftQuantity) / totalQuantity) * 100
  );

  // Update the progress state whenever the left quantity changes
  useEffect(() => {
    setProgress(100 - progressPercent);
  }, [leftQuantity, progressPercent]);

  return (
    <div className='flex w-full flex-col gap-1'>
      <div className='text-color-primary text-sm'>{leftQuantity} left</div>
      <div className='relative h-1 w-full overflow-hidden rounded-full bg-[#F5D2D5]'>
        <div
          className={`absolute left-0 top-0 h-full bg-primary`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

// "progress-bar" style={{ width: `${progress}%` }}
