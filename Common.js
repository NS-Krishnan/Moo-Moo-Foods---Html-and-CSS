
document.addEventListener("DOMContentLoaded", function() {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    updateCartCount(cartItems.length);

    let savedCartItems = sessionStorage.getItem('cartItems');
    if (savedCartItems) {
        cartItems = JSON.parse(savedCartItems);
    } else {
        cartItems = [];
    }
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(itemName, price);
        });
    });
    function updateCartCount(count) {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }
    function addToCart(itemName, price) {
        const existingItem = cartItems.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity += 1;
            cartItems.push(existingItem);

        }
        else {
            const newItem = {
                name: itemName,
                price: price,
                quantity: 1
            };
            cartItems.push(newItem);
        }
        console.log("Adding item to cart:", itemName, price);
        console.log("Cart items:", cartItems);
        alert('Product Added to Cart');
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartUI();
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
                <p>Quantity: ${item.quantity}</p>
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
});
