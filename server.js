const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');

// Middleware for parsing JSON
app.use(express.json());

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    stock INTEGER NOT NULL
  )
`);

// Landing page route (must come before static files)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// POS interface route
app.get('/pos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin interface route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'admin.html'));
});

// Static folders (must come after specific routes)
app.use(express.static('public'));
app.use('/images', express.static('public/images'));

app.get('/products', (req, res) => {
    db.all("SELECT * FROM products", (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    });
  });
  

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // save image here
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });

// Temporary products array
let products = [];

// Add Product API
app.post('/add-product', upload.single('image'), (req, res) => {
    const { name, price, stock } = req.body;
    const image = req.file.filename;
  
    db.run(
      "INSERT INTO products (name, price, image, stock) VALUES (?, ?, ?, ?)",
      [name, price, image, stock],
      function (err) {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Failed to add product' });
        }
        res.json({ message: 'Product added successfully!', id: this.lastID });
      }
    );
  });
  // Delete product
app.delete('/delete-product/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM products WHERE id = ?", [id], function(err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to delete product' });
      }
      res.json({ message: 'Product deleted successfully!' });
    });
  });

  // Edit product
app.put('/edit-product/:id', (req, res) => {
    const id = req.params.id;
    const { name, price, stock } = req.body;
    
    db.run(
      "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
      [name, price, stock, id],
      function(err) {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Failed to update product' });
        }
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully!' });
      }
    );
  });
  

app.listen(PORT, () => {
  console.log(`🚀 Dubz Gears POS running at http://localhost:${PORT}`);
});
