const express = require('express');
const products = require('./products');
const router = express.Router();

// Create product
router.post('/', (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const id = products.length + 1;
  products.push({ id, name, description, price, imageUrl });
  res.json({ message: 'Product added', product: { id, name, description, price, imageUrl } });
});

// Read all products
router.get('/', (req, res) => {
  res.json(products);
});

// Read single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Update product
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const { name, description, price, imageUrl } = req.body;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.imageUrl = imageUrl || product.imageUrl;
  res.json({ message: 'Product updated', product });
});

// Delete product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
});

module.exports = router;