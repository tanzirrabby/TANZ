import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import OrderSuccess from './pages/OrderSuccess';
import ProductManager from './pages/ProductManager';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Cursor />
      <Navbar />
      <CartSidebar />
      <Toaster position="bottom-center" toastOptions={{
        style: { background: '#080808', color: '#fff', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '2px solid #C9A96E' }
      }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>} />
        <Route path="/products/manage" element={<ProtectedRoute adminOnly><ProductManager /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}