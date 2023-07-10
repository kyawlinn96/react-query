import React from 'react';
import BackArrow from '@/assets/BackArrow.svg';
import { useNavigate } from 'react-router-dom';

interface BackStepProps {
  onClick?: () => void;
}
const BackStep: React.FC<BackStepProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (onClick) {
      return onClick();
    }
    navigate(-1);
  };
  return (
    <div onClick={handleGoBack} className='cursor-pointer'>
      <img src={BackArrow} alt='back icon' className='h-5 w-5' />
    </div>
  );
};

export default BackStep;
