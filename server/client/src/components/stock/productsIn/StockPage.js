import React from 'react';
import NewProductForm from './ProductForm';
import UpdateProductQuantityForm from './UpdateProductForm';

function StockPage() {
  const handleNewProductSubmit = (newProductData) => {
    console.log('New Product Data:', newProductData);
  };

  const handleUpdateQuantitySubmit = (updateQuantityData) => {
    console.log('Update Quantity Data:', updateQuantityData);
  };

  return (
    <div>
      <NewProductForm onSubmit={handleNewProductSubmit} />
      <UpdateProductQuantityForm onSubmit={handleUpdateQuantitySubmit} />
    </div>
  );
}

export default StockPage;
