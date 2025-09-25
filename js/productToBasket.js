window.addEventListener('load',solve);

function solve(){

    const categoryInput = document.getElementById('pickCategory');
    const productInput = document.getElementById('pickProduct');
    const quantityInput = document.getElementById('quantityInput');

    const basketList = document.getElementById('basketList');

    const addBasketButton = document.getElementById('addToBasket')

    addBasketButton.addEventListener('click', (event) => {

        if(categoryInput.value !== "" & productInput.value !== "" & quantityInput.value !== ""){

            const category = categoryInput.value;
            const product = productInput.value;
            const quantity = quantityInput.value;

            clearInput();

            const liElement = createElement(category,product,quantity);
        }
    })

    function createElement(category,product,quantity){

        
    }

    function clearInput(){
        categoryInput.value = "";
        productInput.value = "";
        quantityInput.value = "";
    }
}