import { createBrowserRouter } from 'react-router-dom';

import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

import ShopLists from './pages/ShopList';

import ShopAddress from './pages/ShopAddress';
import ShopLandingLayout from '@/layouts/ShopLandingLayout';
// import Address from './pages/Address';
import MainCategory from './pages/Categories';
import ProductSearch from './pages/ProductSearch';
import CartLayout from './layouts/CartLayout';
import CategoryLayout from './layouts/CategoryLayout';

import ResultLists from '@/pages/ResultLists';

import FollowedShops from './pages/FollowedShops';
import Message from './pages/Message';
import OrderDetail from './pages/OrderDetail';
import OrderList from './pages/OrderList';
import ShopLanding from './pages/Shop/ShopLanding';
import Voucher from './pages/Voucher';
import Address from './pages/Me/Address';
import NewAddress from './pages/Me/NewAddress';
import MyProfile from './pages/Me';
import MyWishLists from '@/pages/Me/MyWishLists';
import ViewByCategory from '@/pages/ViewByCategory/ViewByCategory';

import OrderMessage from './pages/OrderDetail/OrderMessage';
import Brands from '@/pages/Brands';
import BrandDetails from '@/pages/Brands/BrandDetail/BrandDetails';
import ChangeLanguage from '@/pages/SystemLanguage/ChangeLanguage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/orders',
    children: [
      { element: <OrderList />, index: true },
      { path: ':orderId', element: <OrderDetail /> },
      { path: ':orderId/messages', element: <OrderMessage /> },
    ],
  },
  {
    path: '/voucher',
    element: <Voucher />,
  },
  {
    path: '/cart',
    element: <CartLayout />,
    children: [{ element: <Cart />, index: true }],
  },
  {
    path: '/message',
    element: <Message />,
  },
  {
    path: '/categories',
    element: <CategoryLayout />,
    children: [{ element: <MainCategory />, index: true }],
  },
  {
    path: '/productsearch',
    element: <ProductSearch />,
  },
  {
    path: '/viewbycategory',
    element: <ViewByCategory />,
  },
  {
    path: '/resultproducts',
    element: <ResultLists />,
  },
  {
    path: '/productdetail/:productId',
    element: <ProductDetail />,
  },
  {
    path: '/changelanguage',
    element: <ChangeLanguage />,
  },
  {
    path: '/shops',
    children: [
      { element: <ShopLists />, index: true },
      {
        path: 'followed',
        element: <FollowedShops />,
      },
      {
        path: ':id',
        element: <ShopLandingLayout />,
        children: [{ element: <ShopLanding />, index: true }],
      },
      {
        path: 'address',
        element: <ShopAddress />,
      },
    ],
  },
  {
    path: '/brands',
    children: [
      { element: <Brands />, index: true },
      {
        path: ':id',
        element: <BrandDetails />,
      },
    ],
  },
  {
    path: '/me',
    children: [
      { element: <MyProfile />, index: true },
      { path: 'address', element: <Address /> },
      { path: 'address/new', element: <NewAddress /> },
      { path: 'wishlists', element: <MyWishLists /> },
    ],
  },
]);

export default router;
