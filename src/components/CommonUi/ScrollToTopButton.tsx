import React, { useEffect, useState } from 'react';
import upButton from '@/assets/floating.svg';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const isScrollBtnVisible = () => {
      window.scrollY > 200 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener('scroll', isScrollBtnVisible);

    return () => {
      window.removeEventListener('scroll', isScrollBtnVisible);
    };
  }, []);

  return (
    <>
      {showButton && (
        <div
          className='fixed bottom-16 right-5 z-50 h-12 w-12 animate-bounce cursor-pointer rounded-full  bg-gray-500 object-contain'
          onClick={handleUp}
        >
          <img src={upButton} alt='button' className='h-full w-full' />
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;
