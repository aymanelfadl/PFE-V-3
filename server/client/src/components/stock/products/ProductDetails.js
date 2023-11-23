// ProductDetails.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCubes, faMoneyBill, faMoneyCheck, faMoneyBillAlt, faCopyright } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = ({ product }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Details</h2>
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            <FontAwesomeIcon icon={faTag} /> <strong>Name:</strong> {product.name}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faCopyright} /> <strong>Category:</strong> {product.category}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faMoneyCheck} /> <strong>Brand:</strong> {product.brand}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faMoneyBillAlt} /> <strong>Supplier:</strong> {product.supplier}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faMoneyBill} /> <strong>Cost Price:</strong> {product.costPrice}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faMoneyBill} /> <strong>Selling Price:</strong> {product.sellingPrice}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faCubes} /> <strong>Quantity in Stock:</strong> {product.quantityInStock}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;