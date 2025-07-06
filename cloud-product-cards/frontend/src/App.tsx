import React, { useEffect, useState } from 'react';
import { fetchProducts } from './services/api';
import ProductCard from './components/ProductCard';

const App: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <div>
      <header>
        <h1>Dashboard de Productos</h1>
      </header>
      <main>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
};

export default App;