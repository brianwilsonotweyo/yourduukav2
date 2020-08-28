import Rating from "../components/Rating";
import { hideLoading, showLoading } from "../utils";
import { getProducts } from '../api';

const HomeScreen = {
  render: async () => {
    showLoading()
    const products = await getProducts();
    if (products.error) {
      return `<div class="error">${products.error}</div>`;
    }
    hideLoading()

    return `
      ${products
        .map(
          (product) => `
          <div class="col-sm-6 col-lg-4">
            <a href="/#/product/${product._id}">
              <div class="card clean-card text-center">
                <img
                  class="card-img-top w-100 d-block"
                  src="${product.image}"
                />
                <div class="card-body info">
                  <h4 class="card-title">${product.name}</h4>
                  <div class="product-rating">
                    ${Rating.render({
                      value: product.rating,
                      text: `${product.numReviews} reviews`,
                    })}
                  </div>
                  <div class="product-brand">
                    ${product.brand}
                  </div>
                  <div class="product-price">
                    UGX ${product.price}
                  </div>
                </div>
              </div>
            </a>
          </div>
      `
        )
        .join("\n")}
    `;
  },
};
export default HomeScreen;
