document.addEventListener('DOMContentLoaded', function() {
    const colorThumbnails = document.querySelectorAll('.thumbnail-card');
    const mainImage = document.getElementById('mainImage');
    const thumbnailsStrip = document.querySelector('.thumbnails-strip');
    const scrollContainer = document.getElementById('scrollContainer');
    
    const url = window.location.href;
    const sneakerId = url.split('#').pop();

    const sneakerTitle = document.querySelector('.product-info h1');
    const sneakerPrice = document.getElementById('price');

    function updateSideViews(sideImages) {
        if (!thumbnailsStrip) return;
        
        thumbnailsStrip.innerHTML = '';
        
        sideImages.forEach((imageSrc) => {
            const thumbnailItem = document.createElement('div');
            thumbnailItem.className = 'thumbnail-item object-contain cursor-pointer';
            thumbnailItem.innerHTML = `
                <div class="thumbnail-container object-contain sm:w-[126px] sm:h-[95px] bg-gray-100 rounded-lg flex items-center justify-center scroll-snap-start">
                    <img src="${imageSrc}" alt="Side View" 
                         class="w-[90px] object-contain transform overflow-hidden">
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

    function updateModelSneakers(sneakers, currentBrand) {
        if (!scrollContainer) return;
        
        scrollContainer.innerHTML = '';
        
        const brandSneakers = sneakers.filter(s => s.brand && s.brand.toLowerCase() === currentBrand.toLowerCase());
        
        brandSneakers.forEach((sneaker) => {
            const scrollItem = document.createElement('div');
            
            scrollItem.innerHTML = `
                <div class="min-w-[262px] h-[195px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <a href="../pages/shop.html#${sneaker.id}">  <img src="${sneaker.image}" alt="${sneaker.name}"
                        class="w-full h-full object-contain cursor-pointer p-4"></a>
                </div>
            `;
    
            // scrollItem.addEventListener('click', () => {
            //     window.location.href = `#${sneaker.id}`;
            //     updateSideViews(sideImages);
            // });
    
            scrollContainer.appendChild(scrollItem);
            
        });
    }

    function updateProductInfo(sneaker) {
        if (sneakerTitle) {
            sneakerTitle.textContent = sneaker.model;
        }
        if (sneakerPrice) {
            sneakerPrice.textContent = `$${sneaker.price.toFixed(2)}`;
        }
    }

    fetch('/source/api/products.json')
        .then(response => response.json())
        .then(data => {
            const sneaker = data.data.sneakers.find(s => s.id.toString() === sneakerId);
            
            if (!sneaker) {
                console.error('Sneaker not found');
                return;
            }
            
            updateProductInfo(sneaker);
            
            // Update the sneakers section with same brand sneakers
            updateModelSneakers(data.data.sneakers, sneaker.brand);
            
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