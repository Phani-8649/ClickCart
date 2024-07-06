// import './App.css';
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';

import React from 'react'


const App = () => {
  const user=true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/products/:categories" element={<ProductList/>}></Route>
        <Route path="/product/:id" element={<Products/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
