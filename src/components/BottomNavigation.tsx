import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import { useGetCartDetail } from '@/api/cart/cart-detail-query';
import { useTranslation } from 'react-i18next';

const BottomNavigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathName = location.pathname.toLowerCase();
  const { data } = useGetCartDetail();
  const totalCountProductCount = data?.productInfo.reduce(
    (total, product) => total + product.qty,
    0
  );

  return (
    <div className='insect-x-0 fixed bottom-0 z-50 flex !h-14 w-full items-center justify-center bg-white shadow-md'>
      <div className='container grid grid-cols-5 shadow-md'>
        <NavItem
          route='/'
          icon={'/img/icons/nav-home.svg'}
          iconActive={'/img/icons/nav-home-active.svg'}
          title={t('Footer.home')}
          active={pathName === '/'}
          count={0}
        />
        <NavItem
          route='/orders'
          icon={'/img/icons/nav-order.svg'}
          iconActive={'/img/icons/nav-order-active.svg'}
          title={t('Footer.orders')}
          active={pathName === '/orders'}
          count={0}
        />
        <NavItem
          route='/cart'
          icon={'/img/icons/nav-cart.svg'}
          iconActive={'/img/icons/nav-cart-active.svg'}
          title={t('Footer.cart')}
          active={pathName === '/cart'}
          count={totalCountProductCount || 0}
        />
        <NavItem
          route='/message'
          icon={'/img/icons/nav-message.svg'}
          iconActive={'/img/icons/nav-message-active.svg'}
          title={t('Footer.messages')}
          active={pathName === '/message'}
          count={0}
        />
        <NavItem
          route='/me'
          icon={'/img/icons/nav-profile.svg'}
          iconActive={'/img/icons/nav-profile-active.svg'}
          title={t('Footer.my-account')}
          active={pathName === '/me'}
          count={0}
        />
      </div>
    </div>
  );
};

export default BottomNavigation;
