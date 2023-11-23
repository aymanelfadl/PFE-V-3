import React from 'react';
import './HeaderBar.css'

function HeaderBar() {
  return (
        <header>
          <div>
            <img src="/logo.png" alt='Logo de OptiStocke' ></img> 
            <h1><span id='opti'><b>OpTi</b></span>-Stocke</h1> 
          </div>
        </header>
  );
}

export default HeaderBar;