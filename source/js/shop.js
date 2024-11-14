document.addEventListener('DOMContentLoaded', function() {
    const colorThumbnails = document.querySelectorAll('.thumbnail-card');
    const sideViewContainers = document.querySelectorAll('.thumbnail-item');
    const mainImage = document.getElementById('mainImage');
    
    fetch('/source/api/products.json')
        .then(response => response.json())
        .then(data => {
            const sneaker = data.data.sneakers[0];
            
            
            // Update the color thumbnail images with main images from JSON
            colorThumbnails.forEach((thumbnail, index) => {
                if (sneaker.sides[index]) {
                    thumbnail.src = sneaker.sides[index].main;
                }
                
                thumbnail.addEventListener('click', function() {
                    // Remove active border from all thumbnails
                    colorThumbnails.forEach(thumb => {
                        thumb.closest('div').classList.remove('border-teal-500');
                    });
                    
                    // Add active border to clicked thumbnail
                    this.closest('div').classList.add('border-teal-500');
                    
                    // Update main image
                    if (mainImage) {
                        mainImage.src = sneaker.sides[index].main;
                    }
                    
                    // Update side view images
                    updateSideViews(sneaker.sides[index].Images);
                });
            });

            function updateSideViews(sideImages) {
                const thumbnailsStrip = document.querySelector('.thumbnails-strip');
                if (!thumbnailsStrip) return;
                
                thumbnailsStrip.innerHTML = '';
                
                sideImages.forEach((imageSrc) => {
                    const thumbnailItem = document.createElement('div');
                    thumbnailItem.className = 'thumbnail-item object-contain cursor-pointer';
                    thumbnailItem.innerHTML = `
                       
                        <div class="thumbnail-container object-contain sm:w-[126px] sm:h-[95px] bg-gray-100 rounded-lg flex items-center justify-center scroll-snap-start">
                            <img src="${imageSrc}" alt="Side View" 
                                 class="w-[90px] object-contain transform">
                        </div>
                    `;

                    thumbnailItem.addEventListener('click', () => {
                        mainImage.src = imageSrc;
                        
                        document.querySelectorAll('.thumbnail-item').forEach(item => {
                            item.classList.remove('active');
                        });
                        thumbnailItem.classList.add('active');
                    });

                    thumbnailsStrip.appendChild(thumbnailItem);
                });
            }

            // Set initial main image and side views if they exist
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