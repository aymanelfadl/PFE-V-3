import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './ExcelPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload} from '@fortawesome/free-solid-svg-icons';
import ExportToExcel from './ExportToExcel';



const AddProductsFromExcel = () => {
  const [file, setFile] = useState(null);
  const [editableProducts, setEditableProducts] = useState([]);
  const [validationError, setValidationError] = useState(null);

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
            product[header] = row[index] || 'Empty-Cell';
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
  
    return JSON.stringify(headerRow) === JSON.stringify(expectedHeaders);
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
        console.log({ products: editableProducts });
        const response = await axios.post('http://localhost:5000/api/products/newproducts', {
        products: editableProducts,
      });
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error confirming product:', error);
        console.log('Server response status:', error.response.status);
        console.log('Server response data:', error.response.data);
      }
    } else {
      setValidationError('Invalid header. Please make sure it matches the specified format.');
    }
  };
  
  const displayErrorMessage = () => {
    setTimeout(() => {
      setValidationError(null);
    }, 3000); 
  };

  return (
  <>
    {validationError && <div className='text-white' id='err'>{validationError}{displayErrorMessage()}</div>}

    <div className='centered-container'>
      <div className="ayman" style={{ width: "100%" }}>
        {editableProducts.length <= 0 && (
          <div className='elfadl'>
            <div className='hamid'>
              <FontAwesomeIcon icon={faUpload} style={{ fontSize: "95px" }} />
              <input className="form-control" type="file" accept=".xlsx, .xls, .ods" onChange={handleFileChange} />
              <p style={{ fontSize: "11px" }}> NOTE: Ensure that the headers in the Excel file match this format (lowercase without extra spaces):
                - name - description - category  - brand - supplierName - supplierContactInfo   - costPrice - sellingPrice   - quantityinStock
              </p>
            </div>
          </div>
        )}
        {editableProducts.length <= 0 && <ExportToExcel />}
      </div>

      {editableProducts.length > 0 && (
        <div className="mt-4">
          <h2>Edit Products</h2>
          <div className="table-container" style={{ maxHeight: '480px', overflowY: 'auto' }}>
            <table className="table table-hover" style={{ padding: "28px" }}>
              <thead className="sticky-top bg-light">
                <tr style={{ backgroundColor: "royalblue" }}>
                  {Object.keys(editableProducts[0]).map((header, colIndex) => (
                    <th key={colIndex}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {editableProducts.map((product, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.entries(product).map(([key, value], colIndex) => (
                      <td
                        key={colIndex}
                        id={value === 'Empty-Cell' ? 'empty-cell' : ''}
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
          </div>
          <center>
            <NavLink exact to="/main" >
              <button className="btn btn-primary mt-3 w-50" onClick={handleConfirm}>
                Insert Your Products
              </button>
            </NavLink>
          </center>
        </div>
      )}
    </div>
  </>
);

  
};

export default AddProductsFromExcel;
