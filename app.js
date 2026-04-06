// ========== SELECT DOM ELEMENTS ==========
const iconCart = document.querySelector('.icon-cart');
const closeCart = document.querySelector('.close');
const body = document.querySelector('body');
const listProductHTML = document.querySelector('.list-product');
const listCartHTML = document.querySelector('.listcart');
const iconCartSpan = document.querySelector('#cart-count');

// ========== DATA ==========
let listProducts = [];    // will hold products from JSON
let carts = [];           // cart array: { product_id, quantity }

// ========== OPEN / CLOSE CART ==========
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.remove('showCart');
});

// ========== DISPLAY PRODUCTS ON PAGE ==========
const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            const newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart">Add to Cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
};

// ========== HANDLE ADD TO CART (Event Delegation) ==========
listProductHTML.addEventListener('click', (event) => {
    const addButton = event.target.closest('.add-to-cart');
    if (!addButton) return;
    const productItem = addButton.closest('.item');
    if (!productItem) return;
    const productId = productItem.dataset.id;
    addToCart(productId);
});

// ========== ADD ITEM TO CART ==========
const addToCart = (productId) => {
    // Find if product already in cart
    const existingIndex = carts.findIndex(item => item.product_id == productId);
    if (existingIndex >= 0) {
        carts[existingIndex].quantity += 1;
    } else {
        carts.push({ product_id: productId, quantity: 1 });
    }
    addCartToHTML();
    saveCartToLocalStorage();
};

// ========== SAVE CART TO LOCALSTORAGE ==========
const saveCartToLocalStorage = () => {
    localStorage.setItem('carts', JSON.stringify(carts));
};

// ========== RENDER CART ITEMS IN SIDEBAR ==========
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    if (carts.length === 0) {
        listCartHTML.innerHTML = '<div style="text-align:center; padding:20px;">Cart is empty</div>';
        iconCartSpan.innerText = '0';
        return;
    }

    carts.forEach(cart => {
        totalQuantity += cart.quantity;
        const product = listProducts.find(p => p.id == cart.product_id);
        if (!product) return;

        const cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.dataset.id = cart.product_id;
        cartItem.innerHTML = `
            <div class="image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="name">${product.name}</div>
            <div class="totalprice">$${(product.price * cart.quantity).toFixed(2)}</div>
            <div class="quantity">
                <span class="minus">-</span>
                <span>${cart.quantity}</span>
                <span class="plus">+</span>
            </div>
        `;
        listCartHTML.appendChild(cartItem);
    });
    iconCartSpan.innerText = totalQuantity;
};

// ========== HANDLE QUANTITY CHANGES (+, -) ==========
listCartHTML.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.classList.contains('minus') && !target.classList.contains('plus')) return;

    const cartItem = target.closest('.item');
    if (!cartItem) return;
    const productId = cartItem.dataset.id;

    if (target.classList.contains('plus')) {
        changeQuantity(productId, 'plus');
    } else if (target.classList.contains('minus')) {
        changeQuantity(productId, 'minus');
    }
});

const changeQuantity = (productId, type) => {
    const index = carts.findIndex(item => item.product_id == productId);
    if (index === -1) return;

    if (type === 'plus') {
        carts[index].quantity += 1;
    } else if (type === 'minus') {
        carts[index].quantity -= 1;
        if (carts[index].quantity <= 0) {
            carts.splice(index, 1);
        }
    }
    addCartToHTML();
    saveCartToLocalStorage();
};

// ========== FETCH PRODUCTS AND INIT ==========
const initApp = () => {
    fetch('products.json')
        .then(res => res.json())
        .then(data => {
            listProducts = data;
            addDataToHTML();

            // Load cart from localStorage after products are loaded
            const savedCart = localStorage.getItem('carts');
            if (savedCart) {
                carts = JSON.parse(savedCart);
                addCartToHTML();
            }
        })
        .catch(err => console.error('Failed to load products:', err));
};

initApp();