import { useState } from 'react';
import axios from 'axios';

export default function CartPage() {
  const [username, setUsername] = useState('');
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/cart/${username}`);
      setCart(res.data);
    } catch (err) {
      alert('Failed to fetch cart');
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.post('http://localhost:4000/api/cart/remove', {
        username,
        productId,
      });
      fetchCart(); // Refresh cart
    } catch (err) {
      alert('Failed to remove item');
    }
  };

  const checkout = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/orders/checkout', { username });
      alert('Order placed: ' + res.data.order.id);
      setCart([]); // Clear cart locally
    } catch (err) {
      alert('Checkout failed');
    }
  };

  return (
    <div>
      <h1>🛒 Your Cart</h1>
      <input
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchCart}>Load Cart</button>

      <ul>
        {cart.map((item, i) => (
          <li key={i}>
            {item.product?.name || 'Unknown Product'} (Qty: {item.quantity}){' '}
            <button onClick={() => removeItem(item.productId)}>Remove</button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && <button onClick={checkout}>Checkout</button>}
    </div>
  );
}
