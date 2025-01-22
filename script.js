
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');

    let itemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            itemCount++;
            cartCount.textContent = itemCount;
        });
    });
});
const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('hide');
});
document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.querySelector('.cart');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const listCard = document.querySelector('.listCard');
    let cartItems = [];
    
    // Toggle cart dropdown visibility
    cartIcon.addEventListener('click', () => {
      cartDropdown.classList.toggle('active');
    });
  
    // Function to add item to cart
    addToCartButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const flowerItem = button.closest('.flower-item');
        const flowerName = flowerItem.querySelector('h3').innerText;
        const flowerImage = flowerItem.querySelector('img').src;
        
        const existingItem = cartItems.find(item => item.image === flowerImage);
        
        if (existingItem) {
          existingItem.count += 1;
        } else {
          cartItems.push({ name: flowerName, image: flowerImage, count: 1 });
        }
  
        updateCart();
      });
    });
  
    // Function to update cart display
    function updateCart() {
      cartCount.innerText = cartItems.reduce((total, item) => total + item.count, 0);
      listCard.innerHTML = '';
  
      cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <div><img src="${item.image}" alt="${item.name}" width="50px"></div>
          <div>${item.name}</div>
          <div class="count">
            <button class="decrement">-</button>
            <span>${item.count}</span>
            <button class="increment">+</button>
          </div>
        `;
        listCard.appendChild(listItem);
      });
    }
  
    // Event listener for increment/decrement buttons
    listCard.addEventListener('click', (e) => {
      if (e.target.classList.contains('increment') || e.target.classList.contains('decrement')) {
        e.stopPropagation();
        const flowerImage = e.target.closest('li').querySelector('div:nth-child(1)').querySelector('img').src;
        const item = cartItems.find(item => item.image === flowerImage);
        
        if (e.target.classList.contains('increment')) {
          item.count += 1;
        } else if (e.target.classList.contains('decrement') && item.count > 1) {
          item.count -= 1;
        } else {
          cartItems = cartItems.filter(i => i !== item);
        }
        updateCart();
      }
    });
  
    // Click outside to close dropdown
    document.addEventListener('click', function(event) {
      if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
        cartDropdown.classList.remove('active');
      }
    });
  });
  function updateCartDropdown() {
    cartDropdown.innerHTML = ""; // Clear previous items

    // Add each item in cart
    for (const [name, item] of Object.entries(cartItems)) {
        const cartItemElement = document.createElement("li");
        cartItemElement.innerHTML = `
            <img src="${item.imageSrc}" alt="${name}">
            <div>${name}</div>
            <div>${item.price}</div>
            <div>Qty: ${item.quantity}</div>
        `;
        cartDropdown.appendChild(cartItemElement);
    }

    // Create and add the Checkout button at the end
    const checkoutButton = document.createElement("button");
    checkoutButton.className = "checkout";
    checkoutButton.innerText = "Checkout";
    cartDropdown.appendChild(checkoutButton);
}