import { getUserInfo, setShipping, getShipping } from "../localStorage";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = {
  after_render: () => {
    document
      .getElementById("shipping-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        setShipping({
          names: document.getElementById("names").value,
          address: document.getElementById("address").value,
          phoneNumber: document.getElementById("number").value,
        });
        document.location.hash = "/payment";
      });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }

    const { names, address, phoneNumber } = getShipping();
    return `
          <div class="content">
          <div>
            ${CheckoutSteps.render({ step1: true, step2: true })}
            <div class="form-container">
                <form id="shipping-form">
                    <ul class="form-items">
                        <li>
                            <h1>DELIVERY</h1>
                        </li>  
                        <li>
                            <label for="name">Receiver's Names</label>
                            <input type="text" name="name" id="names" value="${names}" />
                        </li>  
                        <li>
                            <label for="address">Delivery Address</label>
                            <input type="text" name="address" id="address" value="${address}" />
                        </li>  
                        <li>
                            <label for="phoneNumber">Your Phone Number</label>
                            <input type="number" name="phoneNumber" id="number" value="${phoneNumber}"/>
                        </li> 
                        <li>
                            <button type="submit" class="primary">Continue</button>
                        </li>       
                    </ul>
                    
                </form>
            </div>
            </div>
          </div>
        `;
  },
};

export default ShippingScreen;
