import { useGetBannerAndCategories } from '@/api/home/banner-and-category';
import { useGetProductCardList } from '@/api/home/product-list-query';
import { useGetProductOfferList } from '@/api/home/product-offer';
import { useGetBrandAndCategories } from '@/api/home/brand-and-category';
import { useGetPopularShops } from '@/api/home/popular-shop-query';
import { useJustForYouProducts } from '@/api/home/just-for-you-query';

import BannerSlider from '@/components/BannerSlider/BannerSlider';
import BestSelling from '@/components/Product/BestSelling/BestSelling';
import Category from '@/components/Category/Category';
// import FlashSale from '@/components/Product/FlashSale/FlashSale';
import OptionCategory from '@/components/OptionCategory/OptionCategory';
import PopularShop from '@/components/Shop/PopularShop/PopularShop';
import NewArrival from '@/components/Product/NewArrival/NewArrival';
import Popular from '@/components/Product/Popular/Popular';
import EventsSale from '@/components/Product/EventsSale/EventsSale';
import BottomNavigation from '@/components/BottomNavigation';
import AdsSlider from '@/components/AdsSlider/AdsSlider';
import Brands from '@/components/Brands/Brands';
import ProductListsByCategory from '@/components/ProductListsByCategory/ProductListsByCategory';
import JustForYou from '@/components/Product/JustForYou/JustForYou';
import ScrollToTopButton from '@/components/CommonUi/ScrollToTopButton';
import Loading from './Loading';
import { useState } from 'react';
import TopBar from '@/components/Home/TopBar';
import SelectAddress from '@/components/Home/SelectAddress';

const Home = () => {
  const bannerAndCategory = useGetBannerAndCategories();

  const productCardList = useGetProductCardList();

  const productOfferList = useGetProductOfferList();

  const brandAndCategory = useGetBrandAndCategories();

  const popularShops = useGetPopularShops();

  const justForYou = useJustForYouProducts(1, 10);
  const [shownav, setShownav] = useState(false);

  const isLoading =
    bannerAndCategory.isLoading ||
    productCardList.isLoading ||
    productOfferList.isLoading ||
    brandAndCategory.isLoading ||
    popularShops.isLoading ||
    justForYou.isLoading;

  const isError =
    bannerAndCategory.isError ||
    productCardList.isError ||
    productOfferList.isError ||
    brandAndCategory.isError ||
    popularShops.isError ||
    justForYou.isError;

  if (isError) {
    return <p>Error...</p>;
  }

  return (
    <div className='bg-primary'>
      <TopBar />
      <SelectAddress />

      {isLoading ? (
        <Loading />
      ) : (
        <div className='mb-14 w-full rounded-t-[10px] bg-white py-4 antialiased'>
          <OptionCategory />

          <BannerSlider bannerList={bannerAndCategory?.data?.bannerList} />

          <Category
            mainCategoryList={bannerAndCategory?.data?.mainCategoryList}
          />

          <BestSelling
            bestSellingProducts={productCardList?.data?.bestSellingProductList}
          />

          <PopularShop popularShops={popularShops?.data?.shops} />

          {/* <FlashSale /> */}

          <div className='grid grid-cols-2 gap-2'>
            <NewArrival
              newArrivalProducts={productCardList?.data?.newArrivalProdictList}
            />
            <Popular
              popularProducts={productCardList?.data?.popularNowProductList}
            />
          </div>

          <EventsSale offerProducts={productOfferList?.data} />

          <AdsSlider adsList={bannerAndCategory?.data?.adList} />

          <Brands brandList={brandAndCategory?.data?.brandList} />

          <ProductListsByCategory
            productList={brandAndCategory?.data?.categoryList}
          />

          <JustForYou
            justForYouProducts={justForYou?.data?.pages.flatMap((page) => page)}
          />
        </div>
      )}
      <ScrollToTopButton />
      <BottomNavigation />
    </div>
  );
};

export default Home;
