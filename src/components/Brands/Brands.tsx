import { useNavigate } from 'react-router-dom';
import SectionHeading from '../CommonUi/SectionHeading';

// assets
import ForwardArrow from '@/assets/svgcomponents/ForwardArrow';
import { useTranslation } from 'react-i18next';

interface Props {
  brandList: {
    id: number;
    name: string;
    url: string;
    logoUrl: string;
    isPopular: boolean;
    productInfo: {
      id: number;
      name: string;
      imgUrl: string;
    }[];
  }[];
}

const Brands = ({ brandList }: Props) => {
  const navigate = useNavigate();
  const goToViewMore = () => {};
  const { t } = useTranslation();
  let popularProduct = brandList.find((brand) => brand?.isPopular === true);

  let leftBrand = brandList.filter((brand) => brand?.isPopular === true);
  const goToBrandDetail = (brand: any) => {
    let propState = {
      brandData: brand,
    };
    navigate(`/brands/${brand?.id}`, { state: propState });
  };
  return (
    <div className='my-4'>
      <SectionHeading
        Heading={`🌟 ${t('Home.brand')}`}
        ViewAll={t('Utils.view-more')}
        onClickViewMore={goToViewMore}
      />
      <div className='mt-3 grid w-full grid-cols-2 gap-2 px-4'>
        <div
          className='flex flex-col rounded-[10px] bg-custom-gray-light'
          onClick={() => goToBrandDetail(popularProduct)}
        >
          <div className='relative h-24 w-full object-contain'>
            <img
              src={popularProduct?.url}
              alt={popularProduct?.name}
              className='h-full w-full rounded-[10px]'
            />
            <div className='popular-brand absolute left-0 top-4 px-4 py-1 text-sm font-bold text-white'>
              Popular
            </div>
          </div>
          <div className='flex w-full flex-col gap-y-[6px] p-2'>
            <div className='z-10 -mt-10 block items-center justify-center'>
              <div className='flex flex-col gap-1'>
                <img
                  src={popularProduct?.logoUrl}
                  alt='logo'
                  className='mx-auto h-14 w-14 rounded-[10px] object-contain'
                />
                <p className='mx-auto text-sm font-medium'>
                  {popularProduct?.name}
                </p>
              </div>
            </div>
            <div className='mb-1 mt-2 h-1 border-t border-dashed border-[#D9D9D9]' />
            {popularProduct?.productInfo?.slice(0, 3).map((product) => (
              <div
                className='flex items-center gap-2 rounded-[10px] bg-white p-2'
                key={product.id}
              >
                <img
                  src={product?.imgUrl}
                  alt={product?.name}
                  className='h-8 w-8 rounded-[7px] object-contain'
                />
                <p className='line-clamp-2 text-sm font-normal text-black'>
                  {product?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className='grid grid-rows-5 gap-2'>
          {leftBrand?.slice(1, 6)?.map((brand) => (
            <div
              className='flex items-center gap-2 rounded-[10px] bg-custom-gray-light p-2 '
              key={brand?.id}
              onClick={() => goToBrandDetail(brand)}
            >
              <img
                src={brand?.logoUrl}
                alt={brand?.name}
                className='h-12 w-12 rounded-[10px] object-contain'
              />
              <div className='py-2'>
                <p className='text-sm font-medium text-black'>{brand?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='px-4'>
        {brandList?.length > 7 && (
          <div
            onClick={() => navigate('/brands')}
            className='mt-3 flex w-full items-center justify-center gap-x-2 rounded-[10px] bg-custom-gray-light py-2'
          >
            <p className='text-sm text-gray-400'>
              {t('Home.view-all-brand')} ({brandList?.length})
            </p>
            <ForwardArrow className='w-3.5 fill-gray-400/80' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
