import React from 'react';
import NewProductForm from './ProductForm';
import UpdateProductQuantityForm from './UpdateProductForm';

function StockPage() {
  const handleNewProductSubmit = (newProductData) => {
    // Handle submitting new product data
    console.log('New Product Data:', newProductData);
  };

  const handleUpdateQuantitySubmit = (updateQuantityData) => {
    // Handle submitting update quantity data
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
