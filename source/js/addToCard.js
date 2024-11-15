const showCards = document.querySelector('.show-cards');
const btnShop = document.querySelectorAll('.btn-shop');

JSON.parse(localStorage.getItem('addCardsToLocal')) || []
let localCards = JSON.parse(localStorage.getItem('addCardsToLocal')) || []
for (btn of btnShop) {
            
    btn.addEventListener('click', () => {
        if(localCards.length == 0) {
            return
        }
        showCards.classList.toggle('show')
    })
}