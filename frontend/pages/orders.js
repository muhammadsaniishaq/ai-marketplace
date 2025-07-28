import { useState } from 'react';
import axios from 'axios';

export default function OrdersPage() {
  const [username, setUsername] = useState('');
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/orders/${username}`);
      setOrders(res.data);
    } catch (err) {
      alert('Failed to fetch orders');
    }
  };

  return (
    <div>
      <h1>📦 Your Orders</h1>
      <input
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchOrders}>View Orders</button>

      <ul>
        {orders.map((order, i) => (
          <li key={i}>
            Order #{order.id} - Total Items: {order.items?.length || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}
