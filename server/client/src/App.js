import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import StockPage from './components/stock/productsIn/StockPage';
import MainPage from './components/stock/products/MainPage';
import ExeclPage from './components/ExcelFile/ExcelPage';
import MainSupp from './components/suppliers/MainSupp';
import { NotificationProvider } from './components/side-bar/NotificationContext';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setisLoggedIn(true);
    }
  }, []);

  return (
      <NotificationProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Navigate to="/main" /> : <LoginPage setisLoggedIn={setisLoggedIn} />}
              />
              {isLoggedIn && (
                <>
                  <Route path="/main" element={<MainPage />} />
                  <Route path="/stock" element={<StockPage />}  />
                  <Route path="/convertExcel" element={<ExeclPage />}  />
                  <Route path="/suppliers" element={<MainSupp />} />
                </>
              )}
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
  );
}

export default App;
