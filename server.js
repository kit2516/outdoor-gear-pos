const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');

// Middleware for parsing JSON
app.use(express.json());

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
    try {
      const products = db.getAll();
      res.json(products);
    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ error: 'Database error' });
    }
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
    try {
      console.log('Received add-product request');
      console.log('Body:', req.body);
      console.log('File:', req.file);
      
      if (!req.file) {
        console.error('No image file uploaded');
        return res.status(400).json({ error: 'Image file is required' });
      }
      
      const { name, price, stock } = req.body;
      
      if (!name || !price || !stock) {
        console.error('Missing required fields');
        return res.status(400).json({ error: 'All fields are required' });
      }
      
      const image = req.file.filename;
      console.log('Creating product with:', { name, price, image, stock });
      
      const newProduct = db.add({
        name,
        price: parseFloat(price),
        image,
        stock: parseInt(stock)
      });
      
      console.log('Product created successfully:', newProduct);
      res.json({ message: 'Product added successfully!', id: newProduct.id });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product: ' + error.message });
    }
  });
  // Delete product
app.delete('/delete-product/:id', (req, res) => {
    try {
      const id = req.params.id;
      db.delete(id);
      res.json({ message: 'Product deleted successfully!' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });

  // Edit product
app.put('/edit-product/:id', (req, res) => {
    try {
      const id = req.params.id;
      const { name, price, stock } = req.body;
      
      db.update(id, {
        name,
        price: parseFloat(price),
        stock: parseInt(stock)
      });
      
      res.json({ message: 'Product updated successfully!' });
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.message === 'Product not found') {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(500).json({ error: 'Failed to update product' });
      }
    }
  });
  

app.listen(PORT, () => {
  console.log(`🚀 Dubz Gears POS running at http://localhost:${PORT}`);
});
