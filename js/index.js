/*PRODUCT LIST*/
const categoryBtn = document.getElementById('allGoods').addEventListener('click', (e) => {
  // Hide slider in case we are redirecting from main page
  document.querySelector('.main__content').style.display = 'none';

  // Initializing product list and cart
  // const cart = new Cart($('.header-nav__cart'));
  // let productList = new ProductList('products.json', $('.products-container'), cart);
});

const cart = new Cart($('#cartModal'));
let productList = new ProductList('products.json', $('.products-container'), cart);

/* SLIDER */
let slideIndex = 0;
let timer = null;
showSlides();


// Next/previous controls
function plusSlides(n) {
  clearTimeout(timer);
  showSlides(n);
}

function showSlides(index) {
  let slides = document.getElementsByClassName("mySlides");
  let timeout = 5000;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display ='none'; 
  }
  slideIndex = index ? slideIndex + index : slideIndex + 1;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  if(slideIndex < 1) {
    slideIndex = slides.length; 
  };
  slides[slideIndex-1].style.display="block"; 
  timer  = setTimeout(showSlides, timeout); // Change image every 5 seconds
}