import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [editForm, setEditForm] = useState({ id: null, name: '', price: '' });

  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:4000/api/admin/products', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:4000/api/admin/orders', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data);
  };

  const fetchAnalytics = async () => {
    const res = await axios.get('http://localhost:4000/api/admin/analytics', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAnalytics(res.data);
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
      fetchOrders();
      fetchAnalytics();
    }
  }, [token]);

  const handleEditClick = (product) => {
    setEditForm({ id: product.id, name: product.name, price: product.price });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/api/admin/products/${editForm.id}`, {
      name: editForm.name,
      price: editForm.price
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Product updated!');
    setEditForm({ id: null, name: '', price: '' });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (!confirm('Are you sure?')) return;
    await axios.delete(`http://localhost:4000/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Product deleted!');
    fetchProducts();
  };

  const editOrder = async (id) => {
    const status = prompt('Enter new order status (pending, shipped, delivered, cancelled):');
    await axios.put(
      `http://localhost:4000/api/admin/orders/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Order updated!');
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    await axios.delete(
      `http://localhost:4000/api/admin/orders/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Order deleted!');
    fetchOrders();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {analytics && (
        <div>
          <h2>📊 Analytics</h2>
          <p><strong>Total Users:</strong> {analytics.totalUsers}</p>
          <p><strong>Total Products:</strong> {analytics.totalProducts}</p>
          <p><strong>Total Orders:</strong> {analytics.totalOrders}</p>
          <p><strong>Total Sales:</strong> ₦{analytics.totalSales}</p>
          <p><strong>Most Popular Product:</strong> {analytics.mostPopularProduct}</p>
        </div>
      )}

      <h2>🛍️ Products</h2>
      {editForm.id && (
        <form onSubmit={handleEditSubmit}>
          <input
            value={editForm.name}
            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Name"
          />
          <input
            value={editForm.price}
            onChange={e => setEditForm({ ...editForm, price: e.target.value })}
            placeholder="Price"
            type="number"
          />
          <button type="submit">Update Product</button>
        </form>
      )}
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ₦{p.price}
            <button onClick={() => handleEditClick(p)}>Edit</button>
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>📦 Orders</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            Order #{o.id} - {o.status}
            <button onClick={() => editOrder(o.id)}>Edit</button>
            <button onClick={() => deleteOrder(o.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
  const mostPopularProduct = products.reduce((max, product) => {
    const totalSold = orders.reduce((sum, order) => {
      return sum + order.items.filter(item => item.productId === product.id).reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);
    return totalSold > max.sold ? { name: product.name, sold: totalSold } : max;
  }, { name: '', sold: 0 });

  res.json({
    totalUsers,
    totalProducts,
    totalOrders,
    totalSales,
    mostPopularProduct: mostPopularProduct.name || 'None'
  });
