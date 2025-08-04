document.getElementById('productForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData();
formData.append('name', document.getElementById('name').value);
formData.append('price', document.getElementById('price').value);
formData.append('stock', document.getElementById('stock').value); // ➕ add this
formData.append('image', document.getElementById('image').files[0]);

  const response = await fetch('/add-product', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  document.getElementById('message').textContent = result.message;

  // Reset form
  document.getElementById('productForm').reset();

  // Remove message
  setTimeout(() => {
    document.getElementById('message').textContent = '';
  }, 1000);

  // Reload product list
  loadProducts();
});

// 🔁 Load products and show them in admin page
async function loadProducts() {
  const res = await fetch('/products');
  const products = await res.json();

  const list = document.getElementById('productList');
  list.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="/images/${product.image}" width="150" height="150" style="object-fit: cover; border-radius: 8px;" />
      <h3>${product.name}</h3>
      <p><strong>Price:</strong> ₱${product.price.toFixed(2)}</p>
      <p><strong>Stock:</strong> ${product.stock ?? 0}</p>
      <button onclick="deleteProduct(${product.id})" style="background-color: #dc3545;">Delete</button>
      <button onclick="editProduct(${product.id}, '${product.name}', ${product.price}, ${product.stock ?? 0})" style="background-color: #28a745;">Edit</button>
    `;

    list.appendChild(card);
  });
}

// ❌ Delete product
async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this item?')) return;

  const res = await fetch(`/delete-product/${id}`, {
    method: 'DELETE'
  });

  const result = await res.json();
  alert(result.message);
  loadProducts();
}
//edit function
function editProduct(id, name, price, stock) {
  const newName = prompt("Enter new product name:", name);
  const newPrice = prompt("Enter new price:", price);
  const newStock = prompt("Enter new stock:", stock);

  if (newName && newPrice && newStock) {
    fetch(`/edit-product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        price: parseFloat(newPrice),
        stock: parseInt(newStock)
      })
    })
    .then(res => res.json())
    .then(result => {
      alert(result.message);
      loadProducts();
    });
  }
}

// 🔃 Load products when admin page loads
window.onload = loadProducts;
