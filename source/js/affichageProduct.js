let localCards;
let products;
let filtrdata;
let page;
let productsContainer = document.getElementById("container");
 function addtoCartButt(){
      // button to add product to modal shop
   const addToCard = document.querySelectorAll('.add-to-card');

   addToCard.forEach(btnAdd => {

       btnAdd.addEventListener('click', () => {

           let addToLocal = localCards;

           let moveToCard = btnAdd.dataset.id

           for (card of localCards) {
               if (card == moveToCard) {
                   return;
               }
           }

           addToLocal.unshift(moveToCard)
           localStorage.setItem('addCardsToLocal', JSON.stringify(addToLocal))
           localCards = addToLocal
           shopCards();

       })
   })

 }

fetch("/source/api/products.json")
.then(res => res.json())
.then(res => {
    products = res.data.sneakers;   
    
    filtrdata = products;
    
    localCards = JSON.parse(localStorage.getItem('addCardsToLocal')) || []

    if (products.length > 0) {
        fetchProducts(products)   
        updatePagination();
    }

    addtoCartButt()
    shopCards()
})

// get data from local to 
function shopCards() {
    let card = ''

    if (localCards.length == 0) {
        showCards.classList.remove('show')
        showCards.innerHTML = "";
        showCards.classList.add('hidden')
    } else {
        showCards.classList.remove('hidden')
    }
    
    products.forEach(product => {

        for (let i = 0; i < 4; i++) {
            const element = localCards[i];
            if (product.id == element) {

                showCards.innerHTML = `${card += `
                    <div class="cardProduct flex items-center border-b border-[#484e4e7a] py-2 px-2 hover:bg-gray-100 transition-all ease-in-out duration-300" data-id="${product.id}">
                        <div class="mr-3">
                            <img class="rounded-sm" width="60px" src="${product.image}" alt="">
                        </div>
                        <div class="w-full flex justify-between">
                            <div class="flex flex-col mr-2">
                            <p class="font-semibold text-xl">${product.name}</p>
                            <div class="text-yellow-400">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="removeProduct flex items-center rounded-sm cursor-pointer p-2 hover:bg-teal-300"><i class="fa-solid fa-trash"></i></div>
                        </div>
                        
                    </div>
                `}
        
                <div class="flex text-center p-2">
                    <a href="#" class="w-full py-2 bg-inherit rounded-md transition-all ease-in hover:bg-gray-300 hover:transition-all">View all</a>
                </div>
                `;
            }
            
        }

    })

    const removeProduct = document.querySelectorAll('.removeProduct');

    removeProduct.forEach((remove) => {
        remove.addEventListener('click', (event) => {

            let productId = event.target.closest('.cardProduct').dataset.id

            let removeCard = localCards.filter(el => el != productId)
            
            localStorage.setItem('addCardsToLocal', JSON.stringify(removeCard))
            localCards = removeCard
            shopCards();    
        })
    })
}

let pagination = document.getElementById('pagination');



function changepage(page) {
    productsContainer.innerHTML = ''
    fetchProducts(filtrdata, page);
    for (let child of pagination.children) {
        child.className = "w-12 h-12 text-xl flex items-center justify-center text-gray-700 font-semibold hover:text-teal-500";
    }
    pagination.children[page].className = "w-12 h-12 flex items-center justify-center rounded-full border-2 border-teal-500 text-teal-500 text-xl font-semibold";
}


function updatePagination() {
    let pagesCount = Math.ceil(filtrdata.length/6);
    pagination.innerHTML = '';
    for (let i = 0; i < pagesCount; i++) {
        let button = document.createElement('button');
        button.className = "w-12 h-12 text-xl flex items-center justify-center text-gray-700 font-semibold hover:text-teal-500";
        button.textContent = i + 1;
        button.onclick = function () {
            changepage(i);
        }
        pagination.appendChild(button);
    }
    pagination.firstElementChild.className = "w-12 h-12 flex items-center justify-center rounded-full border-2 border-teal-500 text-teal-500 text-xl font-semibold";
}


async function fetchProducts(filtrdata, page = 0) {
          
        for (i = 6 * page; i < (page + 1) * 6; i++) {
         if(filtrdata[i]){
        
            let product = `
            <div class="w-full mx-auto bg-white rounded-[20px] title-4 py-7 px-3 shadow-lg">
                <div
                    class="grid grid-cols-[20%_60%_20%] grid-rows-[140px] bg-white rounded-[20px]"
                >
                    <div class="flex flex-col justify-around items-center">
                    <img id="img"
                        src="${filtrdata[i].sides[0].main}"
                        class="rotate-[-45deg] w-[80%] transition-all duration-[200ms] cursor-pointer lg:hover:scale-[1.05] scale-[0.75] lg:scale-[0.75] hover:scale-[0.9]"
                        alt=""
                    />
                    <img id="img"
                        src="${filtrdata[i].sides[1].main}"
                        class="rotate-[-45deg] translate-y-[-5px] w-[80%] transition-all duration-[200ms] cursor-pointer lg:hover:scale-[1.05] scale-[0.75] lg:scale-[0.75] hover:scale-[0.9]"
                        alt=""
                    />
                    <img id="img"
                        src="${filtrdata[i].sides[2].main}"
                        class="rotate-[-45deg] translate-y-[-15px] w-[80%] transition-all duration-[200ms] cursor-pointer lg:hover:scale-[1.05] scale-[0.75] lg:scale-[0.75] hover:scale-[0.9]"
                        alt=""
                    />
                    </div>
                    <div class="scale-[0.75] lg:scale-[1]">
                        <img id="img"
                            src="${filtrdata[i].image}"
                            class="rotate-[-45deg] translate-x-[-10px] translate-y-[-30px] w-[95%] transition-all duration-[200ms] cursor-pointer hover:scale-[1.05]"
                            alt=""
                        />
                    </div>
                    <div class="text-center">
                    <i
                        class="fa-regular fa-heart transition-all duration-[200ms] cursor-pointer hover:scale-[1.05] mt-4"
                    ></i>
                    </div>
                </div>
                <h2 class="mt-32 lg:mt-0 lg:font-sans font-bold text-center" id="filtr">${filtrdata[i].name}</h2>
                <div class="flex justify-between mt-4">
                    <h3 class="ml-3 text-gray-500" id="unit">1 UNIT</h3>
                    <a id="rating" href="" class="flex font-bold justify-around mr-3"
                    ><img
                        class="w-3 h-4 mt-1 mr-1"
                        src="../source/img/Plain_Yellow_Star.png"
                        alt=""
                    />
                    4.5
                        </a
                    >
                </div>
                <div class="ml-3 font-sans font-medium mt-2" id="price">$${filtrdata[i].price}</div>
                <div class="flex justify-between items-center mt-3">
                    <div class="flex justify-around">
                    <div id="moin"
                        class="transition-all duration-[200ms] hover:scale-[1.05] cursor-pointer w-4 h-4 text-xl font-mono text-gray-400 flex justify-center items-center mt-1 border-[1px] m-[0_15px]"
                    >
                        -
                    </div>
                    <h4 id="valueshow">1</h4>
                    <div id="plus"
                        class="transition-all duration-[200ms] hover:scale-[1.05] cursor-pointer w-4 h-4 text-xl font-mono text-gray-400 flex justify-center items-center mt-1 border-[1px] m-[0_15px]"
                    >
                        +
                    </div>
                    </div>
                    <div
                    class="add-to-card flex justify-around items-center bg-teal-600 w-[45%] rounded-[6px] text-[12px] mr-2 text-white transition-all duration-[400ms] cursor-pointer hover:scale-[1.05] hover:bg-teal-900 p-3" data-id="${filtrdata[i].id}"
                    >
                    <h3>Add To Cart</h3>
                    <i class="fa-solid fa-bag-shopping"></i>
                    </div>
                </div>
                </div>

            `
            productsContainer.insertAdjacentHTML('afterbegin', product)
         }
    }
    addtoCartButt();
}

function Fillter(value){
    let naval = document.querySelectorAll('.naval');

        naval.forEach((button) =>{
        if(value.toUpperCase() == button.innerText.toUpperCase()){
            button.classList.add("Active");

        }else{
            button.classList.remove("Active");

        }
        });
    document.getElementById('container').innerHTML = '';
    filtrdata = products.filter(product => value === "all" || product.gender.includes(value));

    fetchProducts(filtrdata)
    updatePagination();
    addtoCartButt();

}


async function fetchCasualProducts() {
    fetch("/source/api/products.json")
        .then(res => res.json())
        .then(res => {
            let products = res.data.sneakers;

            if (products.length > 0) {
                let casualProduct = document.getElementById("casual");
                for (i = 0; i < 10; i++) {
                    let product = `

                    <div class="bg-white min-w-60 h-[300px] cards rounded-[20px] title-4 klklk">
                        <div
                        class="grid grid-cols-[20%_60%_20%] grid-rows-[140px] bg-white rounded-[20px]"
                        >
                        <div class="flex flex-col justify-around items-center">
                            <img
                            src="${products[i].sides[0].main}"
                            class="rotate-[-45deg] w-[80%] transition-all duration-[200ms] cursor-pointer hover:scale-[1.05]"
                            alt=""
                            />
                            <img
                            src="${products[i].sides[1].main}"
                            class="rotate-[-45deg] translate-y-[-5px] w-[80%] transition-all duration-[200ms] cursor-pointer hover:scale-[1.05]"
                            alt=""
                            />
                            <img
                            src="${products[i].sides[2].main}"
                            class="rotate-[-45deg] translate-y-[-15px] w-[80%] transition-all duration-[200ms] cursor-pointer hover:scale-[1.05]"
                            alt=""
                            />
                        </div>
                        <div class="">
                            <img
                            src="${products[i].sides[2].main}"
                            class="rotate-[-45deg] translate-x-[-10px] translate-y-[-30px] w-[95%] transition-all duration-[200ms] cursor-pointer hover:scale-[1.05]"
                            alt=""
                            />
                        </div>
                        <div class="text-center">
                            <i
                            class="fa-regular fa-heart transition-all duration-[200ms] cursor-pointer hover:scale-[1.05] mt-4"
                            ></i>
                        </div>
                        </div>
                        <h2 class="font-bold text-center">${products[i].name}</h2>
                        <div class="flex justify-between mt-4">
                        <h3 class="ml-3 text-gray-500">1 UNIT</h3>
                        <a href="" class="flex font-bold justify-around mr-3"
                            ><img
                            class="w-3 h-4 mt-1 mr-1"
                            src="../source/img/Plain_Yellow_Star.png"
                            alt=""
                            />
                            4.5</a
                        >
                        </div>
                        <div class="ml-3 font-sans font-medium mt-2">$${products[i].price}</div>
                        <div class="opps flex justify-between items-center mt-3">
                        <div class="flex justify-around">
                            <div
                            class="transition-all duration-[200ms] hover:scale-[1.05] cursor-pointer w-4 h-4 text-xl font-mono text-gray-400 flex justify-center items-center mt-1 border-[1px] m-[0_15px]"
                            >
                            -
                            </div>
                            <h4>1</h4>
                            <div
                            class="transition-all duration-[200ms] hover:scale-[1.05] cursor-pointer w-4 h-4 text-xl font-mono text-gray-400 flex justify-center items-center mt-1 border-[1px] m-[0_15px]"
                            >
                            +
                            </div>
                        </div>
                        <div
                            class="flex justify-around items-center bg-teal-600 h-5 p-2 w-[45%] rounded-[6px] text-[12px] mr-2 text-white transition-all duration-[400ms] cursor-pointer hover:scale-[1.05] hover:bg-teal-900 p-3"
                        >
                            <h3>Shop Now</h3>
                            <i class="fa-solid fa-bag-shopping"></i>
                        </div>
                        </div>
                    </div>
                `
                    casualProduct.insertAdjacentHTML('beforeend', product)
                }
            }
        })
}
fetchCasualProducts()
