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
    <div class="container">
      <div class="row">
        <div className='col-4'>
        <NewProductForm onSubmit={handleNewProductSubmit} />
        </div>
        <div className='col-6'>
        <UpdateProductQuantityForm onSubmit={handleUpdateQuantitySubmit} />
        </div>
      </div>
    </div>
  );
}

export default StockPage;
