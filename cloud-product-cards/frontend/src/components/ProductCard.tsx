import React from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, imageUrl, onDelete }) => {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p>${price.toFixed(2)}</p>
      <button onClick={() => onDelete(id)}>Eliminar Producto</button>
    </div>
  );
};

export default ProductCard;