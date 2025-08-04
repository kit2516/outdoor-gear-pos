const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data', 'products.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

// Database operations
const db = {
  // Get all products
  getAll: () => {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading database:', error);
      return [];
    }
  },

  // Add a product
  add: (product) => {
    try {
      const products = db.getAll();
      const newProduct = {
        id: Date.now(), // Simple ID generation
        ...product,
        createdAt: new Date().toISOString()
      };
      products.push(newProduct);
      fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update a product
  update: (id, updates) => {
    try {
      const products = db.getAll();
      const index = products.findIndex(p => p.id == id);
      if (index === -1) {
        throw new Error('Product not found');
      }
      products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
      fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2));
      return products[index];
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete a product
  delete: (id) => {
    try {
      const products = db.getAll();
      const index = products.findIndex(p => p.id == id);
      if (index === -1) {
        throw new Error('Product not found');
      }
      const deletedProduct = products.splice(index, 1)[0];
      fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2));
      return deletedProduct;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Get a single product
  getById: (id) => {
    try {
      const products = db.getAll();
      return products.find(p => p.id == id);
    } catch (error) {
      console.error('Error getting product:', error);
      return null;
    }
  }
};

module.exports = db;
