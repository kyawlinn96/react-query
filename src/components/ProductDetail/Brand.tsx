import React from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import ForwardArrow from '@/assets/svgcomponents/ForwardArrow';

interface Props {
  brand: {
    id: number;
    name: string;
    logoUrl: string;
    url: number;
    logoUrl_Web: string;
    url_Web: string;
    description: string;
    facebookUrl: string;
    messengerUrl: string;
    serNo: number;
  };
}

const Brand = ({ brand }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      {brand && (
        <div className='px-4 py-3'>
          <div className='flex items-center justify-between'>
            <p className='text text-gray-800'>About Brand</p>
            <div
              className='flex items-center gap-x-2'
              onClick={() => navigate(`/brands/${brand.id}`)}
            >
              <p className='text-sm text-[#929292]'>View</p>
              <ForwardArrow className='w-3.5 fill-gray-400/80' />
            </div>
          </div>
          <div className='mt-3 flex items-center gap-x-2'>
            <img
              src={brand?.logoUrl}
              alt={brand?.name}
              className='w-10 rounded-full'
            />
            <p>{brand?.name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Brand;
