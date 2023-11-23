// ProductList.js
import React, { useState } from 'react';
import ProductDetails from './ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2>Product List</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ul className="list-group">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => handleProductClick(product)}
              >
                {product.name}
                <span className="badge bg-primary rounded-pill">
                  Quantity: {product.quantityInStock}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          {selectedProduct && <ProductDetails product={selectedProduct} />}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
