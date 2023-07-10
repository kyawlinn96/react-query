import ShopLandingInfo from '@/components/Shop/ShopLanding/ShopLandingInfo';
import ShopLandingFollowShopStatus from '@/components/Shop/ShopLanding/ShopLandingFollowShopStatus';
import ShopLandingRelatedSection from '@/components/Shop/ShopLanding/ShopLandingRelatedSection';
import { useShopLandingStore } from '@/stores/ShopLandingStore/shopLandingStore';

const ShopLanding = () => {
  const ShopDetail = useShopLandingStore((state) => state.shopDetail);

  return (
    <>
      <div className='mb-5 flex flex-col bg-white'>
        <ShopLandingInfo shopData={ShopDetail!} />
        <ShopLandingFollowShopStatus shopData={ShopDetail!} />
        <div className='h-2 w-full bg-custom-gray-light' />
        <ShopLandingRelatedSection />
      </div>
    </>
  );
};

export default ShopLanding;
