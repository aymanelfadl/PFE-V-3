import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ProductList from './components/stock/products/ProductList';
import StockPage from './components/stock/productsIn/StockPage';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

function App() {
  const ayman = [
    {
      id: 1,
      name: 'Product 1',
      category: 'Category A',
      brand: 'Brand X',
      supplier: 'Supplier 1',
      costPrice: 20,
      sellingPrice: 30,
      quantityInStock: 100,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/main"
          element={
            <>
              <Sidebar>
                <Menu
                  menuItemStyles={{
                    button: {
                      [`&.active`]: {
                        backgroundColor: '#13395e',
                        color: '#b6c8d9',
                      },
                    },
                  }}
                >
                  <MenuItem component={<Link to="/main/documentation" />}>Documentation</MenuItem>
                  <MenuItem component={<Link to="/main/calendar" />}>Calendar</MenuItem>
                  <MenuItem component={<Link to="/main/e-commerce" />}>E-commerce</MenuItem>
                </Menu>
              </Sidebar>
              <div style={{ marginLeft: 'var(--nav-width)' }}>
                <Routes>
                  <Route index element={<ProductList products={ayman} />} />
                  <Route path="stock" element={<StockPage />} />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
