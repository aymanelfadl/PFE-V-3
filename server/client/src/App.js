
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import HeaderBar from './components/header/HeaderBar';
import MainHeader from './components/navBar/MainHeader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><HeaderBar /><Auth /></>} />
        <Route
          path="/main"
          element={<MainHeader/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
