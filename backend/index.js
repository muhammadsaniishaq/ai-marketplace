const express = require('express');
const authRoutes = require('./middleware/auth'); // ✅ Fixed
const adminRoutes = require('./adminRoutes');

const app = express();
app.use(express.json());

// Use the routes
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Marketplace backend running!');
});

// Run server
app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
