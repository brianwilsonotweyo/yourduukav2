import {
  getCartItems,
  getShipping,
  getPayment,
  cleanCart,
} from "../localStorage";
import CheckoutSteps from "../components/CheckoutSteps";
import { showLoading, hideLoading, showMessage } from "../utils";
import { createOrder } from "../api";

const convertCartToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = "/cart";
  }
  const shipping = getShipping();
  if (!shipping.address) {
    document.location.hash = "/shipping";
  }
  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = "/payment";
  }
  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;
  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    totalPrice,
  };
};
const PlaceOrderScreen = {
  after_render: () => {
    document
      .getElementById("placeorder-button")
      .addEventListener("click", async () => {
        const order = convertCartToOrder();
        showLoading();
        const data = await createOrder(order);
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          cleanCart();
          document.location = `/#/order/${data.order._id}`;
        }
      });
  },
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = convertCartToOrder();
    return `
    <div>
      ${CheckoutSteps.render({
        step1: true,
        step2: true,
        step3: true,
        step4: true,
      })}
      <div class="content">
      <div class="order">
        <div class="order-info">
          <div>
            <div>
                <h2>Delivery Details</h2>
                <div>
                ${shipping.names}, ${shipping.address}, ${shipping.phoneNumber}
                </div>
            </div>
          </div>
          <div>
            <h2>Payment</h2>
            <div>
              Payment Method : ${payment.paymentMethod}
            </div>
          </div>
          <div>
            <ul class="cart-list-container">
              <li>
                <h2>Items in Basket</h2>
              </li>
              ${orderItems
                .map(
                  (item) => `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <div class="cart-name">
                    <div>
                      <a href="/#/product/${item.product}">${item.name} </a>
                    </div>
                    <div> Qty: ${item.qty} </div>
                  </div>
                  <div class="cart-price"> UGX ${item.price}</div>
                </li>
                `
                )
                .join("\n")}
            </ul>
          </div>
        </div>
        <div class="order-action">
           <ul>
                <li>
                  <h2>Order Summary</h2>
                 </li>
                 <li><div>Items</div><div>UGX ${itemsPrice}</div></li>
                 <li><div>Shipping</div><div>UGX ${shippingPrice}</div></li>
                 <li class="total"><div>Order Total</div><div>UGX ${totalPrice}</div></li> 
                 <li>
                 <button class="primary fw" id="placeorder-button">
                 Finish Ordering
                 </button>
        </div>
      </div>
    </div>
    </div>
    `;
  },
};
export default PlaceOrderScreen;
