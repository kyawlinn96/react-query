import ProductListFrame from '@/components/ProductSearch/ProductLists/ProductListFrame';

import React from 'react';
import { ProductInfo } from '@/types';

import ProductCard from '@/components/ProductSearch/ProductLists/ProductCard';

interface ProductListsProps {
  productLists: ProductInfo[];
  productListsLoading: boolean;
  productListsError: any;
}
const ProductLists: React.FC<ProductListsProps> = ({
  productListsLoading,
  productListsError,
  productLists,
}) => {
  return (
    <div className='relative w-full '>
      <ProductListFrame
        isLoading={productListsLoading}
        isError={productListsError}
      >
        {productLists?.length > 0 &&
          productLists?.map((product) => <ProductCard productData={product} />)}
      </ProductListFrame>
    </div>
  );
};

export default ProductLists;
