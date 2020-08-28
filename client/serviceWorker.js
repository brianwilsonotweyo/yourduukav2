const MyDuuka = "MyDuuka";
const assets = [
  "/",
  "/index.html",
  "/main.js",
  "/src/assets/css/style.css",
  "/src/assets/bootstrap/css/bootstrap.min.css",
  "/src/assets/bootstrap/js/bootstrap.min.js",
  "/src/assets/css/font-awesome.min.css",
  "/src/assets/css/fontawesome-all.min.css",
  "/src/assets/css/smoothproducts.css",
  "/src/assets/js/jquery.min.js",
  "/src/assets/js/smoothproducts.min.js	",
  "/src/assets/js/theme.js",
  "/src/components/CheckoutSteps.js",
  "/src/components/DashboardMenu.js",
  "/src/components/Header.js",
  "/src/components/Rating.js",
  "/src/config.js",
  "/src/index.js",
  "/src/localStorage.js",
  "/src/srceens/CartScreen.js",
  "/src/srceens/DashboardScreen.js",
  "/src/srceens/Error404Screen.js",
  "/src/srceens/HomeScreen.js",
  "/src/srceens/OrderScreen.js",
  "/src/srceens/PaymentScreen.js",
  "/src/srceens/PlaceOrderScreen.js",
  "/src/srceens/ProductEditScreen.js",
  "/src/srceens/ProductListScreen.js",
  "/src/srceens/ProductScreen.js",
  "/src/srceens/RegisterScreen.js",
  "/src/srceens/ShippingScreen.js",
  "/src/srceens/SigninScreen.js",
  "/src/utils.js",
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(MyDuuka).then(cache => {
      cache.addAll(assets);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
