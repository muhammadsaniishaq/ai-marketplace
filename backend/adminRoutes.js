const express = require('express');
const users = require('./users');
const products = require('./products');
const orders = require('./orders');
const isAdmin = require('./middleware/admin');

const router = express.Router();

// USERS
router.get('/users', isAdmin, (req, res) => {
  res.json(users);
});

router.delete('/users/:username', isAdmin, (req, res) => {
  const index = users.findIndex(u => u.username === req.params.username);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

// PRODUCTS
router.get('/products', isAdmin, (req, res) => {
  res.json(products);
});

router.delete('/products/:id', isAdmin, (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
});

router.put('/products/:id', isAdmin, (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const { name, description, price, imageUrl } = req.body;
  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (imageUrl) product.imageUrl = imageUrl;

  res.json({ message: 'Product updated', product });
});

// ORDERS
router.get('/orders', isAdmin, (req, res) => {
  res.json(orders);
});

router.put('/orders/:id', isAdmin, (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const { status } = req.body;
  if (status) order.status = status;

  res.json({ message: 'Order updated', order });
});

router.delete('/orders/:id', isAdmin, (req, res) => {
  const index = orders.findIndex(o => o.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Order not found' });
  orders.splice(index, 1);
  res.json({ message: 'Order deleted' });
});

module.exports = router;

router.get('/analytics', isAdmin, (req, res) => {
  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0);

  // Example: count most popular product
  const productCounts = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      productCounts[item.productId] = (productCounts[item.productId] || 0) + item.quantity;
    });
  });
  const mostPopularProductId = Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b, null);
  const mostPopularProduct = products.find(p => p.id == mostPopularProductId);

  res.json({
    totalUsers,
    totalProducts,
    totalOrders,
    totalSales,
    mostPopularProduct: mostPopularProduct ? mostPopularProduct.name : null
  });
});
