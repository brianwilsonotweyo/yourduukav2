import HomeScreen from './srceens/HomeScreen';
import ProductScreen from './srceens/ProductScreen';
import { parseRequestUrl, showLoading, hideLoading } from './utils';
import Error404Screen from './srceens/Error404Screen';
import CartScreen from './srceens/CartScreen';
import SigninScreen from './srceens/SigninScreen';
import Header from './components/Header';
import RegisterScreen from './srceens/RegisterScreen';
import ShippingScreen from './srceens/ShippingScreen';
import PaymentScreen from './srceens/PaymentScreen';
import PlaceOrderScreen from './srceens/PlaceOrderScreen';
import ProfileScreen from './srceens/ProfileScreen';
import DashboardScreen from './srceens/DashboardScreen';
import ProductListScreen from './srceens/ProductListScreen';
import ProductEditScreen from './srceens/ProductEditScreen';
import OrderScreen from './srceens/OrderScreen';
import OrderListScreen from './srceens/OrderListScreen';

const routes = {
  '/': HomeScreen,
  '/product/:id/edit': ProductEditScreen,
  '/product/:id': ProductScreen,
  '/order/:id': OrderScreen, 
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin':SigninScreen,
  '/register':RegisterScreen,
  '/shipping':ShippingScreen,
  '/payment':PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/profile': ProfileScreen,
  '/dashboard':DashboardScreen,
  '/productlist': ProductListScreen,
  '/orderlist': OrderListScreen,
};
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render()
  await Header.after_render()
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if(screen.after_render)
  await screen.after_render();
  hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}