import React from 'react';
import "../navBar/MainHeader.css"

function MainHeader({ user }) {
  return (
    <header>
          <div>
          <img src='/_84e557ab-0fea-4a90-9391-a972d29d3287.jpeg' alt='Logo de OptiStocke'></img> 
          <h3>Welcom To <span id='opti'><b>OpTi</b></span>-Stocke </h3> 
          </div>
        </header>
  );
}

export default MainHeader;
