import { useState } from 'react';
import { addProduct } from '../utils/api';

export default function AddProduct() {
  const [form, setForm] = useState({ name: '', description: '', price: '', imageUrl: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await addProduct(form);
    alert('Product added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="description" placeholder="Description" onChange={handleChange} /><br />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} /><br />
      <input name="imageUrl" placeholder="Image URL" onChange={handleChange} /><br />
      <button type="submit">Add Product</button>
    </form>
  );
}
