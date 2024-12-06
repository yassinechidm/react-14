import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductList } from './components/ProductList';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Layout } from './components/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <Layout>
                  <ProductList />
                </Layout>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;