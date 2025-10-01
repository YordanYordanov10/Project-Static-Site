window.addEventListener('load', solve);

function solve() {
    const form = document.getElementById('productForm');
    const categoryInput = document.getElementById('pickCategory');
    const productInput = document.getElementById('pickProduct');
    const quantityInput = document.getElementById('quantityInput');
    const basketList = document.getElementById('basketList');
    const addBasketButton = document.getElementById('addToBasket')
    const confirmOrderButton = document.getElementById('confirmOrder');
    const confirmedToBasket = document.getElementById('confirmedToBasket');

    const saved = JSON.parse(localStorage.getItem('basketProducts') || '[]');
    saved.forEach(prod => {
        const li = createElement(prod.category, prod.product, prod.quantity);
        confirmedToBasket.appendChild(li);
    });

    togleConfirmButton();

    addBasketButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add('was-validated'); 
            return;
        }

        const category = categoryInput.value;
        const product = productInput.value;
        const quantity = quantityInput.value;

        clearInput();
        form.classList.remove('was-validated');
        const liElement = createElement(category, product, quantity);
        const spanElement = createButtonsElement(liElement, category, product, quantity);
        liElement.appendChild(spanElement);
        basketList.appendChild(liElement);
        togleConfirmButton();

    });

    confirmOrderButton.addEventListener('click', (event) => {
        event.preventDefault();
        confirmedToBasket.innerHTML = '';

        const products = [];

        const liItems = basketList.querySelectorAll('.list-group-item');
        liItems.forEach(li => {
            const [catEl, prodEl, qtyEl] = li.querySelectorAll('p');
            const itemObj = {
                category: catEl.textContent.trim(),
                product: prodEl.textContent.trim(),
                quantity: qtyEl.textContent.trim()
            };
            products.push(itemObj);

            const confirmLiElement = createElement(itemObj.category,itemObj.product,itemObj.quantity);
            confirmedToBasket.appendChild(confirmLiElement)
        });

        localStorage.setItem('basketProducts', JSON.stringify(products));

    });

    function createElement(category, product, quantity) {
        const categoryElement = document.createElement('p');
        categoryElement.textContent = category;

        const productElement = document.createElement('p');
        productElement.textContent = product;

        const quantityElement = document.createElement('p');
        quantityElement.textContent = quantity;

        const liElement = document.createElement('li');
        liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        liElement.appendChild(categoryElement);
        liElement.appendChild(productElement);
        liElement.appendChild(quantityElement);

        return liElement;

    }

    function createButtonsElement(liElement, category, product, quantity) {
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

        return spanElement;
    }

    function clearInput() {
        categoryInput.value = "";
        productInput.value = "";
        quantityInput.value = "";
    }

    function togleConfirmButton() {
        if (basketList.children.length === 0) {
            confirmOrderButton.style.display = "none";
        } else {
            confirmOrderButton.style.display = "block";
        }
    }
}