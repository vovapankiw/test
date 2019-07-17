class Cart {
    constructor(cartContainer) {
        this.cartContainer = cartContainer;
        this.cart = JSON.parse(localStorage['cart'] || '{}');
        this.addEventListeners();
        this.updateBadge();
        this.height = 0;
    }
    addEventListeners() {
      const modalWindow = document.getElementById('cartModal');

      // Close button of cart modal window
      document.querySelectorAll('.btn-close')
      .forEach(el => el.addEventListener('click', () => {
        modalWindow.style.display = "none";
      }));
      
      // Clear all button in cart modal window
      document.querySelector('.btn-clear').addEventListener('click', () => {
        this.resetCart();
      })


      $('.header-nav__cart').on('click', () => this.renderCart() );
      this.cartContainer.find('.order').click( ev => this.order(ev) );
    }
    addProduct(id, add = false) {
      let quantity = add ? this.cart[id].quantity : 0;
      const selectedHeight = add ? this.cart[id].height : 0
      this.cart[id] = {
        quantity: quantity + 1,
        height: selectedHeight,
      }
        this.saveCart();
        this.updateBadge();
    }
    deleteProduct(id) {
        if (this.cart[id].quantity > 1) {
            this.cart[id].quantity -= 1;
        } else {
            delete this.cart[id];
        }
        this.saveCart();
        this.updateBadge();
    }
    selectHeight(id, selectedHeight) {
      this.cart[id].height = selectedHeight;
      this.height = selectedHeight;
      this.saveCart();
      this.updateBadge();
    }
    saveCart() {
        localStorage['cart'] = JSON.stringify(this.cart);
    }
    resetCart() {
      const form  = this.cartContainer.find('form')[0];
      form.reset();
      this.cart = {};
      this.saveCart();
      this.updateBadge();
      this.renderCart();
    }
    renderCart(selectedHeight = '0') {
        let total = 0;
        let cartDomSting = 
            `<div class="container">
                <div class="row">
                    <div class="col-4"><strong>Продукт</strong></div>
                    <div class="col-2 cart__price-title"><strong>Ціна</strong></div>
                    <div class="col-2 cart__height-title"><strong>Ріст</strong></div>
                    <div class="col-2"><strong>Кількість</strong></div>
                </div>`;
        for (const id in this.cart) {
            const product = productList.getProductById(id);
            total += product.price[this.cart[id].height].price * this.cart[id].quantity;
            cartDomSting += 
                `<div class="row product__row" data-id="${id}"> 
                    <div class="col-4">${product.title}</div>
                    <div class="col-2">${product.price[this.cart[id].height].price}</div>
                    <select id="height_select_${id}" class="cart__height-select col-2" name="height">`

            let heightOptions ='';
            for (const heightId in product.price) {
              if(this.cart[id].height === +heightId) {
                heightOptions += `
                <option selected value=${heightId}>${product.price[heightId].height}</option>
              `
              } else {
                heightOptions += `
                <option value=${heightId}>${product.price[heightId].height}</option>
              `
              }
            }

            cartDomSting += heightOptions;

            cartDomSting += `
                </select>
                <div class="col-2 cart__quantity">${this.cart[id].quantity}</div>
                <div class="cart__btn-quantity col-2">
                  <button class="btn btn-sm plus">+</button>
                  <button class="btn btn-sm minus">-</button>
                </div>
              </div>
              <hr>`;
        }

        total = total.toFixed(2);
        cartDomSting += `
                <div class="row">
                    <div class="col-5"><strong>Загальна сума</strong></div>
                    <div class="col-5"><strong>${total} грн</strong></div>
                </div>            
        </div>`;

        this.cartContainer.find('.cart-product-list-container').html(cartDomSting);
        this.cartContainer.find('.plus').click( ev => this.changeQuantity(ev, this.addProduct) );
        this.cartContainer.find('.minus').click( ev => this.changeQuantity(ev, this.deleteProduct) );
        const modalWindow = document.getElementById('cartModal');
        modalWindow.style.display = "block";
        $( ".cart__height-select" ).change( ev => this.changeHeight(ev, this.selectHeight));
    }
    changeQuantity(ev, operation) {
        const button = $(ev.target);
        const id = button.parent().parent().data('id');
        operation.call(this, id, true);
        this.renderCart();
    }
    changeHeight(ev, operation) {
      const button = $(ev.target);
      const id = button.parent().data('id');
      operation.call(this, id, button[0].selectedIndex);
      this.renderCart({id, selected: button[0].selectedIndex});
      
    }
    updateBadge() {
        $('#cart-badge').text(Object.keys(this.cart).length);
    }
    order(ev) {
      if(Object.keys(this.cart).length === 0) {
        window.showAlert('Спершу оберіть товар', false);
        return;
      }
        const form  = this.cartContainer.find('form')[0];
        if (form.checkValidity()) {
            ev.preventDefault();
            let finalSum = 0;
            let result = Object.keys(this.cart).map(el => {
              finalSum += productList.getProductById(el).price * this.cart[el];
              return {
                імя: productList.getProductById(el).title,
                кількість: this.cart[el]
              }
            })
            $.ajax({
                url: "https://usebasin.com/f/958b2a2cef0b.json", 
                method: "POST",
                mode: "no-cors",
                data: {
                    clientName: $('#client-name').val(),
                    clientEmail: $('#client-email').val(),
                    cart: {...result, сума: finalSum}
                },
                dataType: "json"
            })
             .done( () => {
                this.resetCart();
                 window.showAlert('Дякуємо за покупку! Ми з вами звяжемося в найближчий час');
                 this.cartContainer.modal('hide');
             } )
             .fail( () =>
                 window.showAlert('Вибачте сталась помилка спробуйте пізніше, або звяжіться за телефоном 38(067)95-00-887', false)
             );    
        } else {
            window.showAlert('Будь ласка заповніть усі поля', false);
        }
    }
}
