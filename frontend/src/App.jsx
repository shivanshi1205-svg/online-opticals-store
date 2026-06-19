import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './components/admin/AdminRoute';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import ProductEdit from './pages/admin/ProductEdit';
import AdminCategories from './pages/admin/Categories';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import BookEyeTest from './pages/BookEyeTest';
import useThemeStore from './store/useThemeStore';

function App() {
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300">
      <Routes>
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="product/:id/edit" element={<ProductEdit />} />
            <Route path="categories" element={<AdminCategories />} />
          </Route>
        </Route>
        <Route path="/*" element={
          <>
            <Header />
            <main className="flex-grow flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/eyeglasses" element={<Shop />} />
                <Route path="/sunglasses" element={<Shop />} />
                <Route path="/computer-glasses" element={<Shop />} />
                <Route path="/contact-lenses" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/book-eye-test" element={<BookEyeTest />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
