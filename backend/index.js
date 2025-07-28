const express = require('express');
const authRoutes = require('./auth');

const app = express();
app.use(express.json());

// Use the auth routes
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Marketplace backend running!');
});

// ... your other routes

// Run server
app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
const adminRoutes = require('./adminRoutes');
app.use('/api/admin', adminRoutes);
