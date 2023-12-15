

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ProductList from './components/stock/products/ProductList';
import ProductForm from './components/stock/productsIn/ProductForm';
import StockPage from './components/stock/productsIn/StockPage';

function App() {
  const ayman = [{
      id: 1,
      name: 'Product 1',
      category: 'Category A',
      brand: 'Brand X',
      supplier: 'Supplier 1',
      costPrice: 20,
      sellingPrice: 30,
      quantityInStock: 100,
  }];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"   element={<LoginPage />} />
        <Route path="/main" element={<ProductList products={ayman} />} /> 
        <Route path="/main/stock" element={<StockPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
