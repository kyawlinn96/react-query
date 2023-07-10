import { Tab } from '@headlessui/react';
import React from 'react';
import cn from 'classnames';
import ShopLandingPromotion from './ShopLandingPromotion';
import ShopLandingProducts from './ShopLandingProducts';
import ShopLandingCategory from './ShopLandingCategory';
import ShopLandingBrand from './ShopLandingBrand';

const ShopLandingRelatedSection = () => {
  const ShopRelatedTabs = [
    { id: 1, title: 'Promotions', element: <ShopLandingPromotion /> },
    { id: 2, title: 'Products', element: <ShopLandingProducts /> },
    { id: 3, title: 'Category', element: <ShopLandingCategory /> },
    { id: 4, title: 'Brands', element: <ShopLandingBrand /> },
  ];
  return (
    <div className='py-2'>
      <Tab.Group>
        <Tab.List className='flex h-12 gap-4 border-b-2 border-[#EEEEEE] px-4 text-base font-medium'>
          {ShopRelatedTabs?.map((tab) => (
            <Tab
              key={tab?.id}
              className={({ selected }) =>
                cn(
                  'relative w-20 text-base leading-5',
                  'focus:!outline-none',
                  selected
                    ? 'border-b-2 border-[#CF202D] text-primary'
                    : 'text-gray-500'
                )
              }
            >
              {tab?.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {ShopRelatedTabs.map((shopTab) => (
            <Tab.Panel key={shopTab.id}>{shopTab.element}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ShopLandingRelatedSection;
