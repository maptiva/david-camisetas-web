import React from 'react';
import styles from './ProductCard.module.css';

// La imagen de placeholder ya no es necesaria por defecto,
// pero la podemos mantener como fallback si la imagen del producto no carga.
import placeholder from '../assets/placeholder.jpg';

const ProductCard = ({ product }) => {
  // Si no hay producto, no renderizamos nada o un esqueleto. Por ahora, nada.
  if (!product) {
    return null;
  }

  const imageUrl = product.image_url || placeholder;

  return (
    <div className={styles.productoCard}>
      <img
        src={imageUrl}
        alt={product.name}
        onError={(e) => { e.target.onerror = null; e.target.src=placeholder; }} // Fallback por si la URL de la imagen está rota
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className={styles.precio}>${product.price ? product.price.toFixed(2) : '0.00'}</p>
      <div className={styles.productoAcciones}>
        <input type="number" className={styles.inputCantidad} defaultValue="1" min="1" data-id={product.id} />
        <button className={styles.agregarCarrito} data-id={product.id}>Agregar al Pedido</button>
      </div>
    </div>
  );
};

export default ProductCard;