import React from 'react';
import './App.css';
import ASINProductData from './componets/ASINProducts/ASINProductsData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Amazon ASIN Product Data Scraper</h1>
      </header>
      <ASINProductData />
    </div>
  );
}

export default App;
