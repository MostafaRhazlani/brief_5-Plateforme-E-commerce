document.addEventListener('DOMContentLoaded', function() {
    const colorThumbnails = document.querySelectorAll('.thumbnail-card');
    const mainImage = document.getElementById('mainImage');
    const thumbnailsStrip = document.querySelector('.thumbnails-strip');
  
    function updateSideViews(sideImages) {
        if (!thumbnailsStrip) return;
        
        thumbnailsStrip.innerHTML = '';
        
        sideImages.forEach((imageSrc) => {
            const thumbnailItem = document.createElement('div');
            thumbnailItem.className = 'thumbnail-item object-contain cursor-pointer';
            // thumbnailItem.DataView = 'side';
            thumbnailItem.innerHTML = `
                <div class="thumbnail-container object-contain sm:w-[126px] sm:h-[95px] bg-gray-100 rounded-lg flex items-center justify-center scroll-snap-start">
                    <img src="${imageSrc}" alt="Side View" 
                         class="w-[90px] object-contain transform">
                </div>
            `;


            thumbnailItem.addEventListener('click', () => {
                mainImage.src = imageSrc;
               
                    mainImage.classList.add('side-view');
              
                
                
                document.querySelectorAll('.thumbnail-item').forEach(item => {
                    item.classList.remove('active');
                });
                thumbnailItem.classList.add('active');
            });

            thumbnailsStrip.appendChild(thumbnailItem);
            mainImage.classList.remove('side-view');
        });
    }

    fetch('/source/api/products.json')
        .then(response => response.json())
        .then(data => {
            const sneaker = data.data.sneakers[0];
            
            colorThumbnails.forEach((thumbnail, index) => {
                if (sneaker.sides[index]) {
                    thumbnail.src = sneaker.sides[index].main;
                }
                
                thumbnail.addEventListener('click', function() {
                    colorThumbnails.forEach(thumb => {
                        thumb.closest('div').classList.remove('border-teal-500');
                    });
                    
                    this.closest('div').classList.add('border-teal-500');
                    
                    if (mainImage && sneaker.sides[index]) {
                        mainImage.src = sneaker.sides[index].main;
                        updateSideViews(sneaker.sides[index].Images);
                    }
                });
            });

            // Set initial state
            if (sneaker.sides[0]) {
                if (mainImage) {
                    mainImage.src = sneaker.sides[0].main;
                }
                updateSideViews(sneaker.sides[0].Images);
            }
        })
        .catch(error => {
            console.error('Error loading sneaker data:', error);
        });
});

