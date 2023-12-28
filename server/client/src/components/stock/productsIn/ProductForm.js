
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function NewProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    supplierName: '',
    supplierContactInfo: '',
    costPrice: '', 
    sellingPrice:'',
    quantityInStock: '', 
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/products/newproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log('New Product Response:', data);

      setFormData({
        name: '',
        description: '',
        category: '',
        brand: '',
        supplierName: '',
        supplierContactInfo: '',
        costPrice: 0,
        sellingPrice: 0,
        quantityInStock: 0,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add New Product
      </h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Brand:</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Supplier Name:</label>
          <input
            type="text"
            className="form-control"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Supplier Contact Info:</label>
          <input
            type="text"
            className="form-control"
            name="supplierContactInfo"
            value={formData.supplierContactInfo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cost Price:</label>
          <input
            type="number"
            className="form-control"
            name="costPrice"
            value={formData.costPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Selling Price:</label>
          <input
            type="number"
            className="form-control"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity in Stock:</label>
          <input
            type="number"
            className="form-control"
            name="quantityInStock"
            value={formData.quantityInStock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProductForm;

