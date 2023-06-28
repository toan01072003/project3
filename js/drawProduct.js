import { API_PRODUCT } from "./contants.js";
import { fetchApi } from "./fetchApi.js";
import { params, products } from "./variable.js";

export const drawProduct = () => {
  let category = "";
  if (params.category != "") {
    category = `&category=${params.category}`;
  }

  const api = `${API_PRODUCT}?q=${params.q}&_sort=${params.sort}&_order=${params.order}&_page=${params.page}&_limit=${params.limit}${category}`;

  fetchApi(api).then((data) => {
    let htmls = data.map((item) => {
      return `
        <div class="product__item">
          <div class="product__image">
            <img src="${item.thumbnail}" alt="${item.title}" />
            <div class="product__percent">
              ${item.discountPercentage}%
            </div>
          </div>
          <div class="product__content">
            <h3 class="product__title">
              ${item.title}
            </h3>
            <div class="product__meta">
              <div class="product__price">
                ${item.price}$
              </div>
              <div class="product__stock">
                Còn lại: ${item.stock} sp
              </div>
            </div>
          </div>
        </div>
      `;
    });

    products.innerHTML = htmls.join("");
  });
};
