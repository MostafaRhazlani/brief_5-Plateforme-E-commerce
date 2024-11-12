let recommendedList = document.getElementById('recommended-list');

fetch('/source/api/products.json')
.then(response => response.json())
.then(response => {
    let dataList = response.data.sneakers;
    let dataAvailable = [];
    let favItems = [];
    let i = 0;

    if(localStorage.getItem('favList')) {
        favItems = localStorage.getItem('favList').split(',');
        favItems.pop();
    }

    dataList.forEach(element => {
        if (!favItems.includes('' + element.id)) {
            dataAvailable.push(element);
        }
    });

    console.log(favItems);
    console.log(dataAvailable);

    while(i < 3 && dataAvailable.length > 0) {
        let randomNumber = Math.floor(Math.random() * dataAvailable.length);
        console.log(randomNumber);
        console.log(dataAvailable[randomNumber]);

        let div = document.createElement('div');
        div.className = "md:w-1/2 md:mx-auto xl:pe-0 xl:w-full";

        div.innerHTML = 
            `<div class="border-l-4 border-teal-600 p-6 rounded-r-lg shadow-lg bg-white relative">

                <button type="button" class="absolute top-5 right-5" data-id="${dataAvailable[randomNumber].id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart fill-teal-400 w-6 h-6" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>
                </button>

                <div class="flex items-center gap-4">
                    <img src="${dataAvailable[randomNumber].image}" alt="" class="w-20 rounded-md">
                    <div>
                        <a href="#" class="mb-1 text-lg font-semibold block hover:text-teal-600 transition-colors">${dataAvailable[randomNumber].model}</a>
                        <span class="text-gray-500">${dataAvailable[randomNumber].gender.join(' / ')}</span>
                    </div>
                </div>

                <p class="my-7 text-gray-700 font-medium">${dataAvailable[randomNumber].description}</p>

                <div class="flex justify-between items-center">
                    <span class="font-semibold text-gray-500">${dataAvailable[randomNumber].brand}</span>
                    <h3 class="text-xl font-bold text-teal-600">${dataAvailable[randomNumber].price}$</h3>
                </div>
            </div>`;
        recommendedList.append(div);

        div.querySelector('button').addEventListener('click', addToFavorite);

        dataAvailable.splice(randomNumber, 1);
        console.log(dataAvailable)

        i++;
    }
})
.catch(error => console.log(error));


function addToFavorite() {
    if (!this.classList.contains('added-fav')) {
        let id = this.dataset.id;
        this.classList.add('added-fav');
        this.innerHTML = 
            `<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-heart-fill fill-red-500 w-6 h-6" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"></path>
            </svg>`;
        
        if(localStorage.getItem('favList')) {
            localStorage.setItem('favList', localStorage.getItem('favList') + id + ',')
        } else {
            localStorage.setItem('favList', id + ',')
        }
    } else {
        this.classList.remove('added-fav');
        this.innerHTML = 
            `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart fill-teal-400 w-6 h-6" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>`

    }
}