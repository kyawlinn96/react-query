import React from 'react';
import { useNavigate } from 'react-router-dom';

// types
import { SearchType } from '@/types';

// images
import GroupDeal from '@/assets/groupoption/group.png';
import Official from '@/assets/groupoption/store.png';
import Brands from '@/assets/groupoption/view_brands.png';
import Category from '@/assets/groupoption/category.png';
import Flash from '@/assets/groupoption/flash_sale.png';
import OptionCategoryCard from './OptionCategoryCard';

const OptionCategory: React.FC = () => {
  const navigate = useNavigate();

  const RouteToPromotions = () => {
    let propState = {
      productName: 'Promotions',
      searchType: SearchType.SEARCH_PROMOTION,
    };

    navigate('/resultproducts', { state: propState });
  };

  const RouteToShopList = () => {
    navigate('/shops');
  };

  const RouteToBrands = () => {
    navigate('/brands');
  };

  const RouteToCategory = () => {
    navigate(`/categories?categoryId=${0}`);
  };

  return (
    <div className='grid grid-cols-5 px-2'>
      <OptionCategoryCard
        image={GroupDeal}
        title='Promotions'
        viewByTitle={RouteToPromotions}
      />
      <OptionCategoryCard
        image={Official}
        title='Official Stores'
        viewByTitle={RouteToShopList}
      />
      <OptionCategoryCard
        image={Brands}
        title='View Brands'
        viewByTitle={RouteToBrands}
      />
      <OptionCategoryCard
        image={Category}
        title='Shop by Categories'
        viewByTitle={RouteToCategory}
      />
      <OptionCategoryCard
        image={Flash}
        title={String('Flash\nSale')}
        viewByTitle={RouteToBrands}
      />
    </div>
  );
};

export default OptionCategory;
