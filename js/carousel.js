document.addEventListener('DOMContentLoaded', () => {
  fetch('data/carousel.json')
    .then(response => response.json())
    .then(slides => {
      const inner = document.querySelector('#slider .carousel-inner');

      slides.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item' + (index === 0 ? ' active' : '');
        div.innerHTML = `
          <img src="${item.src}" 
               class="d-block w-100"
               alt="${item.alt}"
               loading="lazy">
          ${item.caption ? `<div class="carousel-caption d-none d-md-block"><h5>${item.caption}</h5></div>` : ''}
        `;
        inner.appendChild(div);
      });
    })
    .catch(err => console.error('Грешка при зареждане на JSON:', err));
});