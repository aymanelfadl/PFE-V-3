import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import './ExcelPage.css';

const AddProductsFromExcel = () => {
  const [file, setFile] = useState(null);
  const [editableProducts, setEditableProducts] = useState([]);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    // Handle any side effects or updates needed when editableProducts changes
    console.log('Editable Products Updated:', editableProducts);
  }, [editableProducts]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setValidationError(null);

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const productsFromExcel = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const headerRow = productsFromExcel[0];

        if (!validateHeader(headerRow)) {
          setValidationError('Invalid header. Please make sure it matches the specified format.');
          return;
        }

        const products = productsFromExcel.slice(1).map((row) => {
          const product = {};
          headerRow.forEach((header, index) => {
            product[header.toLowerCase()] = row[index] || 'Empty';
          });
          return product;
        });

        setEditableProducts(products);
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const validateHeader = (headerRow) => {
    const expectedHeaders = [
      'name',
      'description',
      'category',
      'brand',
      'supplierName',
      'supplierContactInfo',
      'costPrice',
      'sellingPrice',
      'quantityInStock',
    ];

    const sanitizedHeaderRow = headerRow.map((header) => header.trim().toLowerCase());
    const sanitizedExpectedHeaders = expectedHeaders.map((header) => header.trim().toLowerCase());

    return JSON.stringify(sanitizedHeaderRow) === JSON.stringify(sanitizedExpectedHeaders);
  };

  const handleEditChange = (value, rowIndex, colIndex) => {
    const updatedProducts = [...editableProducts];
    const key = Object.keys(updatedProducts[rowIndex])[colIndex];
    updatedProducts[rowIndex][key] = value;
    setEditableProducts(updatedProducts);
  };

  const handleConfirm = async () => {
    if (validateHeader(Object.keys(editableProducts[0]))) {
      try {
        const response = await axios.post('http://localhost:5000/api/products/newproducts', {
          products: editableProducts,
        });
  
        console.log('Server response:', response.data);
  
      } catch (error) {
        console.error('Error confirming products:', error);
        console.log('Server response status:', error.response.status);
        console.log('Server response data:', error.response.data);
      }
    } else {
      setValidationError('Invalid header. Please make sure it matches the specified format.');
    }
  };
  

  return (
    <div className="container mt-4">
      <input className="form-control" type="file" accept=".xlsx, .xls, .ods" onChange={handleFileChange} />
      {validationError && <div className="text-danger">{validationError}</div>}
      {editableProducts.length > 0 && (
        <div className="mt-4">
          <table className="table table-hover">
            <thead className="sticky-top bg-light">
              <tr>
                {Object.keys(editableProducts[0]).map((header, colIndex) => (
                  <th key={colIndex}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {editableProducts.map((product, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(product).map(([key, value], colIndex) => (
                    <td
                      key={colIndex}
                      id={value === 'Empty' ? 'empty-cell' : ''}
                      contentEditable={true}
                      onBlur={(e) => handleEditChange(e.target.innerText, rowIndex, colIndex)}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={handleConfirm}>
            Confirm Products
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProductsFromExcel;
