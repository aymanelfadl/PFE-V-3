
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import MainHeader from './components/navBar/MainHeader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route
          path="/main"
          element={<MainHeader/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
