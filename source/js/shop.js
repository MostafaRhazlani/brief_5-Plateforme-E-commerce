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
                <div class="thumbnail-container object-contain sm:w-[126px] sm:h-[95px] bg-gray-100 rounded-lg flex items-center justify-center scroll-snap-start overflow-hidden">
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
                 <img src="${sneaker.image}" alt="${sneaker.name}"
                        class="w-full h-full object-contain cursor-pointer p-4">
                </div>
            `;
    
           scrollItem.addEventListener('click', () => {
                window.location.href = `#${sneaker.id}`;

                const selectSneaker = sneakers.find(a => a.id === sneaker.id)

                if(selectSneaker) {
                    updateProductInfo(selectSneaker);
                    updateSideViews(selectSneaker.sides[0].Images)

                    if(mainImage) {
                        mainImage.src = selectSneaker.sides[0].main
                    }

                    updateModelSneakers(sneakers, selectSneaker.brand)
                   
                    colorx(selectSneaker)
                }
            });
    
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
    function colorx(sneakerId){
        colorThumbnails.forEach((thumbnail, index) => {
            if (sneakerId.sides[index]) {
                thumbnail.src = sneakerId.sides[index].main;
            }
            
            thumbnail.addEventListener('click', function() {
                colorThumbnails.forEach(thumb => {
                    thumb.closest('div').classList.remove('border-teal-500');
                });
                
                this.closest('div').classList.add('border-teal-500');
                
                if (mainImage && sneakerId.sides[index]) {
                    mainImage.src = sneakerId.sides[index].main;
                    updateSideViews(sneakerId.sides[index].Images);
                }
            });
        });
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
            colorx(sneaker)
           

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