import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ProductList from './components/stock/products/ProductList';
import StockPage from './components/stock/productsIn/StockPage';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<ProductList />} />
        <Route path="/stock" element={<StockPage />} />
      </Routes>
    </BrowserRouter>
  );
}  

export default App;
