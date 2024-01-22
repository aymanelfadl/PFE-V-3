import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "./StockPage.css";

function NewProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    supplierName: '',
    supplierContactInfo: '',
    costPrice: '',
    sellingPrice: '',
    quantityInStock: '',
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersInfo, setSuppliersInfo] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/productlist');
        const FromServer = response.data; 
        setCategories(FromServer.map(Obj => Obj.category));
        setBrands(FromServer.map(Obj => Obj.brand));
        setSuppliers(FromServer.map(Obj => Obj.supplierName));
        setSuppliersInfo(FromServer.map(Obj => Obj.supplierContactInfo));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/products/newproduct', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('New Product Response:', response.data);

      setFormData({
        name: '',
        description: '',
        category: '',
        brand: '',
        supplierName: '',
        supplierContactInfo: '',
        costPrice: '',
        sellingPrice: '',
        quantityInStock: '',
      });
      setValidationErrors({});
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.validationErrors) {
        setValidationErrors(error.response.data.validationErrors);
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="container mt-4" style={{
      padding: '16px',
      border: '1px solid royalblue',
      borderRadius: '10px',
    }}>
      <h2 className='mb-4'>
        <u>Add New Product</u>
      </h2>
      <form onSubmit={handleSubmit} method="POST" className="row g-3">
        <div className="col-md-4 mb-3 p-2">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
          {validationErrors.name && <div className="text-danger">{validationErrors.name}</div>}
        </div>
  
        <div className="col-md-4 mb-3 p-2">
          <label className="form-label">Category:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category"
            list="categoryList"
          />
          <datalist id="categoryList">
             {Array.from(new Set(categories)).map((category) => (
             <option key={category} value={category} />  ))}
          </datalist>
        </div>
  
        <div className="col-md-4 mb-3 p-2">
          <label className="form-label">Brand:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Brand..."
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            list="brandList"
          />
          <datalist id="brandList">
            {Array.from(new Set(brands)).map((brand) => (
            <option key={brand} value={brand} />
       ))}
          </datalist>
          {validationErrors.brand && <div className="text-danger">{validationErrors.brand}</div>}
        </div>
  
        <div className="col-md-6 mb-3 p-2">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control form-control-sm"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
          {validationErrors.description && <div className="text-danger">{validationErrors.description}</div>}
        </div>
  
        <div className="col-md-6 mb-3 p-2">
          <label className="form-label">Supplier Name:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            placeholder="Enter supplier name"
            list="supplierList"
          />
         <datalist id="supplierList">
            {Array.from(new Set(suppliers)).map((supplierName) => (
            <option key={supplierName} value={supplierName} />
            ))}
          </datalist>
          {validationErrors.supplierName && <div className="text-danger">{validationErrors.supplierName}</div>}
        </div>
  
        <div className="col-md-6 mb-3 p-2">
          <label className="form-label">Supplier Contact Info:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="supplierContactInfo"
            value={formData.supplierContactInfo}
            onChange={handleChange}
            placeholder="Enter supplier contact info"
            list="supplierInfoList"
          />
          <datalist id="supplierInfoList">
            {Array.from(new Set(suppliersInfo)).map((supplierInfo) => (
              <option key={supplierInfo} value={supplierInfo} />
            ))}
          </datalist>
          {validationErrors.supplierContactInfo && (
            <div className="text-danger">{validationErrors.supplierContactInfo}</div>
          )}
        </div>
  
        <div className="col-md-6 mb-3 p-2">
          <label className="form-label">Cost Price:</label>
          <input
            type="number"
            className="form-control form-control-sm"
            name="costPrice"
            value={formData.costPrice}
            onChange={handleChange}
            placeholder="Enter cost price"
            required
          />
          {validationErrors.costPrice && <div className="text-danger">{validationErrors.costPrice}</div>}
        </div>
  
        <div className="col-md-6 mb-3 p-2">
          <label className="form-label">Selling Price:</label>
          <input
            type="number"
            className="form-control form-control-sm"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            placeholder="Enter selling price"
            required
          />
          {validationErrors.sellingPrice && <div className="text-danger">{validationErrors.sellingPrice}</div>}
        </div>
  
        <div className="col-md-6 mb-3 p-2">
          <label className="form-label">Quantity in Stock:</label>
          <input
            type="number"
            className="form-control form-control-sm"
            name="quantityInStock"
            value={formData.quantityInStock}
            onChange={handleChange}
            placeholder="Enter quantity in stock"
            required
          />
          {validationErrors.quantityInStock && (
            <div className="text-danger">{validationErrors.quantityInStock}</div>
          )}
        </div>
  
        <center>
          <button type="submit" id="add-product">
            <FontAwesomeIcon icon={faSquarePlus} style={{ marginRight: '8px' }} />Add Product
          </button>
        </center>
      </form>
    </div>
  );
};
export default NewProductForm;
