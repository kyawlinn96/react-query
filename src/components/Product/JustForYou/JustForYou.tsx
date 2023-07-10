import React from 'react';
import Masonry from 'react-masonry-css';

// components
import ProductCard from './ProductCard';

interface Props {
  justForYouProducts: {
    createdDate: string;
    id: number;
    imgUrl: string | null;
    name: string;
    originalPrice: number;
    promotePercent: number;
    promotePrice: number;
  }[];
}

const JustForYou = ({ justForYouProducts }: Props) => {
  const handleClickMore = () => {};

  return (
    <div className='mt-6 px-4'>
      <p className='mb-3 text-center text-xl font-semibold'>Just For You</p>
      <Masonry
        breakpointCols={{ default: 2 }}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {justForYouProducts.map((product) => (
          <div key={product?.id}>
            <ProductCard productData={product} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default JustForYou;
