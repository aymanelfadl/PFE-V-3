import React, { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/productlist');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  const handleProductClick = (product) => {
    setSelectedProduct((prevSelectedProduct) =>
      prevSelectedProduct === product ? null : product
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 ml-5 " style={{marginRight:'-275px', marginLeft:'275px'}}>
            <div className="input-group">
              <input type="search"
                placeholder="What're you searching for?" 
                aria-describedby="button-addon1" 
                className="form-control border-0 bg-light"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
              <div className="input-group-append">
                <button id="button-addon1" type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
              </div>
            </div>
          </div>
          <h3 style={{marginBottom:'12px'}}> Product List: </h3>
          <ol className="list-group list-group-numbered">
      {filteredProducts.map((product) => (
        <li
          key={product._id}  
          className="list-group-item d-flex justify-content-between align-items-start"
          onClick={() => handleProductClick(product)}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{product.name}</div>
               <div style={{marginLeft:'8px',}}>{product.category}</div>
          </div>
          <span
            className={`badge bg-primary rounded-pill ${
              product.quantityInStock === 0
                ? 'bg-danger'
                : product.quantityInStock < 5
                ? 'bg-warning'
                : ''
            }`}
            style={{marginTop: '15px'}}
          >
            Quantity: {product.quantityInStock}
          </span>
        </li>
      ))}
    </ol>
        </div>
        <div className="col-md-6">
          {selectedProduct && <ProductDetails product={selectedProduct} />}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
