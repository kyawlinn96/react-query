import React, { useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetProductByBrandId } from '@/api/brands/products-by-brand-query';
import useIntersectionObserver from '@/utils/useIntersectionObserver';

const BrandDetailHook = () => {
  const { id } = useParams();
  const location = useLocation();
  const urlData = location.state;
  const loadMoreRef = useRef(null);

  // query
  const {
    totalProducts,
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetProductByBrandId(
    urlData?.brandData?.brandId || id,
    10,
    urlData?.shopData?.shopId || null
  );
  console.log(totalProducts);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });
  return {
    urlData,
    loadMoreRef,
    isSuccess,
    totalProducts,
    isFetchingNextPage,
    fetchNextPage,
    data,
    hasNextPage,
    isLoading,
  };
};
export default BrandDetailHook;
