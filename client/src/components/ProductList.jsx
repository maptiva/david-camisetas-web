import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import styles from './ProductList.module.css';

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar los productos: {error}</p>;
  }

  if (!products || products.length === 0) {
    return <p>No hay productos disponibles en este momento.</p>;
  }

  return (
    <div className={styles.productosContainer}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;