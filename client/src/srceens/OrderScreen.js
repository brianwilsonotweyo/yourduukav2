import {
  parseRequestUrl,
} from '../utils';
import { getOrder} from '../api'; 


const OrderScreen = {
  after_render: async () => {},
  render: async () => {
    const request = parseRequestUrl();
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
    } = await getOrder(request.id);   
    return `
    <div class="content">
    <div>
    <h1>OrderID:  ${_id}</h1>
      <div class="order">
        <div class="order-info">
          <div>
            <h2>Shipping Details</h2>
            <div>
            ${shipping.names},
            ${shipping.phoneNumber},
            ${shipping.address},
            </div>
            ${
              isDelivered
                ? `<div class="success">Delivered at ${deliveredAt}</div>`
                : `<div class="error">Not Delivered</div>`
            }
             
          </div>
          <div>
            <h2>Payment</h2>
            <div>
              Payment Method : ${payment.paymentMethod}
            </div>
            ${
              isPaid
                ? `<div class="success">Paid at ${paidAt}</div>`
                : `<div class="error">Not Paid</div>`
            }
          </div>
          <div>
            <ul class="cart-list-container">
              <li>
                <h2>Shopping Cart</h2>
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
                .join('\n')}
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
                 <li><div class="fw" id="paypal-button"></div></li>
                 <li>
               
        </div>
      </div>
    </div>
    </div>
    `;
  },
};
export default OrderScreen;
