class Gallery {
  constructor (productsUrl, renderContainer) {
      fetch(productsUrl)
          .then(result => result.json() )
          .then(photos => {
              this.photos = photos;
              this.renderPhoto(this.photos,renderContainer);
              this.addGalleryEventListeners();
          })
  }

  renderPhoto (photos, renderContainer) {
    let photoDOMString = '';
    photos.forEach(photo => {
      photoDOMString += `
      <div class="gallery-item">
        <div class="content">
          <img class="gallery_photo" src="images/galery/${photo.name}" alt="">
        </div>
        <div class="photo-title--hidden">${photo.title}</div>
      </div>
    `;
    })

    renderContainer.html(photoDOMString);
  }

  addGalleryEventListeners() {
    const gallery = document.querySelector('#gallery');
    const getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
    const getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
    const resizeAll = function () {
      const altura = getVal(gallery, 'grid-auto-rows');
      const gap = getVal(gallery, 'grid-row-gap');
      gallery.querySelectorAll('.gallery-item').forEach(function (item) {
          const el = item;
          // el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
      });
    };
    gallery.querySelectorAll('img').forEach(function (item) {
      item.classList.add('byebye');
        item.addEventListener('load', function () {
          const altura = getVal(gallery, 'grid-auto-rows');
          const gap = getVal(gallery, 'grid-row-gap');
          const gitem = item.parentElement.parentElement;
          // gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
          item.classList.remove('byebye');
        });
    });
    window.addEventListener('resize', resizeAll);
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {        
          item.classList.toggle('full'); 
          item.children[1].classList.toggle('photo-title');       
      });
    });

  }
}