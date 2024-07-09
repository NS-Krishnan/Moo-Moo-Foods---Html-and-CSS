
document.addEventListener("DOMContentLoaded", function() {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    updateCartCount(cartItems.length);
    updateTotalPriceUI();
    updateTotalIteamUI();
    updateTotalProductsUI();

    let savedCartItems = sessionStorage.getItem('cartItems');
    if (savedCartItems) {
        cartItems = JSON.parse(savedCartItems);
    } else {
        cartItems = [];
    }
    document.querySelectorAll('#clearall').forEach(button => {
        button.addEventListener('click', function() {
            clearAll();
        });
    });
    document.querySelectorAll('#checkout').forEach(button => {
        button.addEventListener('click', function() {
            checkout();
        });
    });
    function updateCartCount(count) {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }
    function updateCartUI() {
        const productsContainer = document.createElement('div');
        productsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                 <h2>${item.name}</h2>
                <p>Price: £${item.price}</p>
            `;
            console.log(productCard);
            productsContainer.innerHTML = '';
            productsContainer.appendChild(productCard);
        });
        const cartCountElement = document.getElementById('cart-count')||sessionStorage.getItem('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartItems.length;
            sessionStorage.setItem('cart-count', cartItems.length);
        }
    }
    function clearAll() {
        cartItems = [];
        updateTotalPriceUI();
        updateCartUI();
        updateTotalIteamUI();
        updateTotalProductsUI();
        sessionStorage.removeItem('cartItems');
        alert('Cleared All Cart');
    }
    function checkout() {
        alert('Checkout process initiated!');
    }
    function calculateTotalPrice() {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price;
        });
        return totalPrice;
    }
    function updateTotalPriceUI() {
        const totalPrice = calculateTotalPrice();
        const totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `Total Price: £${totalPrice.toFixed(2)}`;
        }
    }
    function calculateTotalIteam() {
        return cartItems.length;
    }
    function updateTotalIteamUI() {
        const totalIteam = calculateTotalIteam();
        const totalIteamElement = document.getElementById('total-iteam');
        if (totalIteamElement) {
            totalIteamElement.textContent = `Total Iteam: ${totalIteam}`;
        }
    }
    function calculateTotalProducts() {
        const productNames = cartItems.map(item => item.name).join(", ");
        return productNames;
    }
    function updateTotalProductsUI() {
        const totalProducts = calculateTotalProducts();
        const totalProductsElement = document.getElementById('product-title');
        if (totalProductsElement) {
            totalProductsElement.textContent = `Products: ${totalProducts}`;
        }
    }
});
