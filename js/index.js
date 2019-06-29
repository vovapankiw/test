// Hide product grid
document.querySelector('.all_products_container').style.display = 'none';

/*ALL PRODUCT TYPES*/
const types = ['all-goods','cyparis', 'larix', 'pinus', 'taxus', 'thuja'];

/*PRODUCT LIST*/
const cart = new Cart($('#cartModal'));
let productList = new ProductList('products.json', $('.products-container'), cart);

// Handle click on Home btn
document.querySelector('.home').addEventListener('click', () => {
  document.querySelector('.main__content').style.display = 'block';
  document.querySelector('.all_products_container').style.display = 'none';
});

// // Handle click on All good btn
// const categoryBtn = document.getElementById('allGoods').addEventListener('click', (e) => {
//   // Hide slider in case we are redirecting from main page
//   document.querySelector('.main__content').style.display = 'none';
//   // Show grid of products
//   document.querySelector('.all_products_container').style.display = 'block';
//   productList = new ProductList('products.json', $('.products-container'), cart);
// });

/* EVENT HANDLERS FOR EACH CATEGORY*/
types.forEach(el => {
  document.querySelectorAll(`.${el}`).forEach(node => {
    node.addEventListener('click', () => {
      document.querySelector('.main__content').style.display = 'none';
      document.querySelector('.all_products_container').style.display = 'block';
      el = el === 'all-goods' ? '': el;
      productList = new ProductList('products.json', $('.products-container'), cart, `${el}`);
    })
  })
})

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