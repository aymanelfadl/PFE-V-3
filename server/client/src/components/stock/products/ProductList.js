import React, { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import './MainPage.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState({ value: 'za', label: <i className="fas fa-sort-alpha-up-alt"> <b>Sort From A to Z</b></i> });
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isFullWidth, setIsFullWidth] = useState(false);

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
  
    setSelectedProduct((newSelectedProduct) => {
      if (newSelectedProduct === product) {
        setIsFullWidth(true);
      } else {
        setIsFullWidth(false);
      }
      return newSelectedProduct;
    });
  };
  
  

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };

  const customOptions = [
    { value: 'za', label: <i className="fas fa-sort-alpha-up-alt"> <b>Sort From A to Z</b></i> },
    { value: 'az', label: <i className="fas fa-sort-alpha-down-alt"> <b>Sort From Z to A</b></i> },
    { value: 'topQuantity', label: <i className="fas fa-arrow-up"> <b>Sort With Top Quantity</b></i> },
    { value: 'lowQuantity', label: <i className="fas fa-arrow-down"> <b>Sort With Low Quantity</b></i> }
  ];

  const sortedProducts = (products, sortOption) => {
    switch (sortOption.value) {
      case 'za':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'az':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      case 'topQuantity':
        return products.sort((a, b) => b.quantityInStock - a.quantityInStock);
      case 'lowQuantity':
        return products.sort((a, b) => a.quantityInStock - b.quantityInStock);
      default:
        return products;
    }
  };

  const filteredAndSortedProducts = sortedProducts(
    products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortOption
  );

  const selectAll = () => {
    if (selectedProducts.length === filteredAndSortedProducts.length) {
      setSelectedProducts([]);
      setSelectedProduct(null)
    } else {
      setSelectedProducts([...filteredAndSortedProducts]);
    }
  };

  const handelProductDelete = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to delete.");
      return;
    }
    const updatedProducts = products.filter(
      (product) => !selectedProducts.includes(product)
    );

    setProducts(updatedProducts);
    setSelectedProduct(null);
    setSelectedProducts([]);
  };

  return (
    <div className={`container mt-4 ${isFullWidth ? 'w-100' : ''}`}>
      <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 ml-5" style={{ marginRight: "250px", marginLeft: "250px" }}>
        <div className="input-group">
          <input
            type="search"
            placeholder="What're you searching for?"
            aria-describedby="button-addon1"
            className="form-control border-0 bg-light"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button id="button-addon1" type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: "10px" }}>
        <h2>Product List</h2>

        <div className={isFullWidth ? 'col-md-6 border-end' : 'border-end'}>
          <Select
            options={customOptions}
            value={sortOption}
            onChange={handleSortChange}
            isSearchable={false}
          />

          <ol className="list-group list-group-numbered" style={{ maxHeight: "70vh", overflowY: "auto", marginTop: "8px" }}>
            {filteredAndSortedProducts.map((product) => (
              <li
                key={product._id}
                style={{
                  userSelect: "none",
                  padding: "28px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedProducts.some(
                      (selectedProduct) => selectedProduct._id === product._id
                    ) || hoveredProduct === product
                      ? "#e0e0e0"
                      : "inherit",
                }}
                className="list-group-item d-flex justify-content-between align-items-start"
                onClick={() => handleProductClick(product)}
                onMouseEnter={() => setHoveredProduct(product)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{product.name}</div>
                  <div style={{ marginLeft: '8px' }}>{product.category}</div>
                </div>
                <span
                  className={`badge bg-primary rounded-pill ${
                    product.quantityInStock === 0
                      ? 'bg-danger'
                      : product.quantityInStock < 5
                        ? 'bg-warning'
                        : ''
                  }`}
                  style={{ marginTop: '15px' }}
                >
                  Quantity: {product.quantityInStock}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className={isFullWidth ? 'col-md-6' : ''} id="pr-dt">
          {selectedProduct && <h2 style={{ marginTop: "-44px" }}>Product Details</h2>}
          {selectedProduct && <ProductDetails product={selectedProduct} />}
          {selectedProduct && <button className="btn btn-danger p-2 " style={{ marginLeft: "28px", marginTop: "10px" }} onClick={handelProductDelete}>Delete Selected Products</button>}
          {selectedProduct && <button className="btn btn-primary p-2 " style={{ marginLeft: "120px", marginTop: "10px" }} onClick={selectAll}>Select All Products</button>}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
