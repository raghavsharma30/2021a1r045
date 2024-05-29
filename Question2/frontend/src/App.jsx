import './App.css';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import ProductList from './components/ProductList';
import HomePage from './components/HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/categories/:categoryname/products/:productid" element={<Products />} />
        <Route path="/categories/:categoryname/products" element={<ProductList />} />
        <Route path="/" element={<HomePage />} /> {/* Added route for the homepage */}
      </Routes>
    </div>
  );
}

export default App;
