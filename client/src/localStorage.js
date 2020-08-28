export const getCartItems = () => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return cartItems;
};
export const setCartItems = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
export const setUserInfo = ({
  _id = "",
  name = "",
  email = "",
  password = "",
  token = "",
  isAdmin = false,
}) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      _id,
      name,
      email,
      password,
      token,
      isAdmin,
    })
  );
};

export const getUserInfo = () => {
  return localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { name: "", email: "", password: "" };
};

export const getShipping = () => {
  const shipping = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : {
        names: "",
        address: "",
        phoneNumber: "",
      };

  return shipping;
};

export const setShipping = ({
  names="",
  address = "",
  phoneNumber= "",
})=>{
  localStorage.setItem('shipping',
  JSON.stringify({names, address, phoneNumber})
  )
};

export const getPayment = () => {
  const payment = localStorage.getItem("payment")
    ? JSON.parse(localStorage.getItem("payment"))
    : {
        paymentMethod: "Cash On Delivery",
      };
  return payment;
};

export const setPayment = ({ paymentMethod = "Cash On Delivery " }) => {
  localStorage.setItem("payment", JSON.stringify({ paymentMethod }));
};

export const cleanCart = ()=>{
  localStorage.removeItem('cartItems');
}

export const clearUser = () => {
  localStorage.removeItem('userInfo');
};