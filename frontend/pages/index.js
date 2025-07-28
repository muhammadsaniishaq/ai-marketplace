import { useEffect, useState } from 'react';
import { getProducts } from '../utils/api';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h1>Marketplace Products</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <p>Price: ${p.price}</p>
            {p.imageUrl && <img src={p.imageUrl} alt={p.name} width={100} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
