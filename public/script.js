let cart = {};

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/products');
  const products = await res.json();

  const productList = document.getElementById('productList');

  const itemGrid = document.createElement('div');
  itemGrid.className = 'item-grid';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'item-card';

    const img = document.createElement('img');
    img.src = `images/${product.image}`;
    img.alt = product.name;

    const name = document.createElement('h3');
    name.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = `₱${product.price}`;

    const btn = document.createElement('button');
    btn.textContent = 'Add';
    btn.onclick = () => addToCart(product.name, parseFloat(product.price));

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(btn);

    itemGrid.appendChild(card);
  });

  productList.appendChild(itemGrid);
});

function addToCart(name, price) {
  if (!cart[name]) {
    cart[name] = { quantity: 1, price };
  } else {
    cart[name].quantity += 1;
  }
  updateCart();
}

function removeFromCart(name) {
  if (cart[name]) {
    cart[name].quantity -= 1;
    if (cart[name].quantity <= 0) {
      delete cart[name];
    }
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  cartItems.innerHTML = '';

  let total = 0;
  for (const name in cart) {
    const { quantity, price } = cart[name];
    const itemTotal = quantity * price;
    total += itemTotal;

    const li = document.createElement('li');
    li.innerHTML = `
      ${quantity} x ${name} = ₱${itemTotal.toFixed(2)}
      <button onclick="removeFromCart('${name}')">❌</button>
    `;
    cartItems.appendChild(li);
  }

  totalEl.textContent = total.toFixed(2);
}

function pay() {
  if (Object.keys(cart).length === 0) {
    alert("Walay sulod ang cart.");
    return;
  }

  const confirmPay = confirm("Bayaran na ni nimo?");
  if (confirmPay) {
    alert("Payment successful. Salamat!");
    cart = {};
    updateCart();
  }
}
