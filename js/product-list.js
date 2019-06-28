class ProductList {
    constructor (productsUrl, renderContainer, cart, type = '') {
        this.cart = cart;
        fetch(productsUrl)
            .then(result => result.json() )
            .then(products => {
                this.products = type 
                ? products.filter(el => el.type === type)
                : products;
                this.renderProducts(renderContainer, this.products);
                this.addEventListeners();
            })
    }
    getProductById(id) {
        return this.products.find(el => el.id === id);
    }
    renderProducts(container, products) {
        let productListDomString = ''
        products.forEach(product => {
            productListDomString += 
                `<div class="card">
                  <img src="images/goods/${product.image}" class="card-img-top"  alt="${product.title}">
                  <div class="card-body">
                    <h4 class="card-title">${product.title}</h4>
                    <div class="btn__container">
                      <button class="btn btn-info" data-toggle="modal"
                      data-target="#productInfoModal" data-id="${product.id}">
                        Інфо
                      </button>   
                      <button class="btn btn-buy" data-id="${product.id}">
                        $${product.price[0].price} - Купити
                      </button> 
                    </div> 
                  </div>
                </div>`;
        });
        container.html(productListDomString);
    }
    addEventListeners() {
        $('.btn-info').on('click', event => {
            const id = event.currentTarget.dataset.id;
            const product = this.getProductById(id);
            const container = document.querySelector(".modalInfo");

            const modalInfoDOMString = 
            `<div class="modal__content">
              <div class="modal__header">
                <h5 class="modal__title" id="productInfoLabel">${product.title}</h5>
                <a href="#" class="close"></a>
              </div>
              <div class="modal__body">
                <div class="modal__body_container">
                  <img class="modal__img" src="images/goods/${product.image}" alt="">
                  <table class="modal__table">
                    <tr>
                      <th>Висота, см</th>
                      <th>Вид пакування</th>
                      <th>Ціна, грн</th>
                    </tr>
                    <tr>
                      <td>10-15</td>
                      <td>P9</td>
                      <td>22</td>
                    </tr>
                    <tr>
                      <td>30-35</td>
                      <td>P9</td>
                      <td>60</td>
                    </tr>
                    <tr>
                      <td>50-55</td>
                      <td>C2</td>
                      <td>110</td>
                    </tr>
                    <tr>
                      <td>90-110</td>
                      <td>C5</td>
                      <td>260</td>
                    </tr>
                  </table>
                </div>
                <p class="modal__description custom-scroll">
                    ${product.description}
                </p>
              </div>
              
              <div class="modal__footer">
                <button type="button" class="btn btn-close modal__btn">Закрити</button>
                <button class="btn modal__btn-buy modal__btn" data-id="id">Купити</button>
              </div>
            </div>
            `;
            // Add HTML to the DOM
            container.innerHTML = modalInfoDOMString;
            // Get the modal
            const modalWindow = document.getElementById('modalInfo');
            // When the user clicks on the button, open the modal 
            modalWindow.style.display = "block";

            // Get the <span> element that closes the modal
            const span = document.getElementsByClassName("close")[0];
            const closeBtn = document.getElementsByClassName("btn-close")[0];

            span.onclick = function() {
              modalWindow.style.display = "none";
            }

            closeBtn.onclick = function() {
              modalWindow.style.display = "none";
            }
            
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
              if (event.target == modalWindow) {
                modalWindow.style.display = "none";
              }
            }
        });
        $('.btn-buy, .modal__btn-buy').click( event => {
            const button = $(event.target);
            const id  = button.data('id'); 
            this.cart.addProduct(id);
            // window.showAlert('Product added to cart');
        });
    }
}
