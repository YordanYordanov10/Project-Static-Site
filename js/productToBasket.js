window.addEventListener('load', solve);

function solve() {

    const categoryInput = document.getElementById('pickCategory');
    const productInput = document.getElementById('pickProduct');
    const quantityInput = document.getElementById('quantityInput');
    const basketList = document.getElementById('basketList');
    const addBasketButton = document.getElementById('addToBasket')
    const confirmOrderButton = document.getElementById('confirmOrder');

    togleConfirmButton();

    addBasketButton.addEventListener('click', (event) => {

        if (categoryInput.value !== "" && productInput.value !== "" && quantityInput.value !== "") {

            const category = categoryInput.value;
            const product = productInput.value;
            const quantity = quantityInput.value;

            clearInput();
            const liElement = createElement(category, product, quantity);
            basketList.appendChild(liElement);
            togleConfirmButton();
        }
    })

    function createElement(category, product, quantity) {
        const categoryElement = document.createElement('p');
        categoryElement.textContent = category;

        const productElement = document.createElement('p');
        productElement.textContent = product;

        const quantityElement = document.createElement('p');
        quantityElement.textContent = quantity;

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'me-1');
        editButton.textContent = 'Edit';

        editButton.addEventListener('click', () => {
            categoryInput.value = category;
            productInput.value = product;
            quantityInput.value = quantity;
            liElement.remove();
            togleConfirmButton();
        })

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger');
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => {
            liElement.remove();
            togleConfirmButton();
        })

        const spanElement = document.createElement('span');
        spanElement.appendChild(editButton);
        spanElement.appendChild(deleteButton);

        const liElement = document.createElement('li');
        liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        liElement.appendChild(categoryElement);
        liElement.appendChild(productElement);
        liElement.appendChild(quantityElement);
        liElement.appendChild(spanElement);

        return liElement;

    }

    function clearInput() {
        categoryInput.value = "";
        productInput.value = "";
        quantityInput.value = "";
    }

    function togleConfirmButton(){
       if(basketList.children.length === 0){
        confirmOrderButton.style.display = "none";
       }else{
        confirmOrderButton.style.display = "block";
       }
    }
}