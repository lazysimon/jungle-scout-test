import React from 'react';
import './App.scss';
import ASINProductData from './componets/ASINProducts/ASINProductsData';
import Header from './componets/ASINProducts/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <ASINProductData />
    </div>
  );
}

export default App;
