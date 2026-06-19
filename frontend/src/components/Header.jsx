import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Phone, Moon, Sun, Monitor } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useThemeStore from '../store/useThemeStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const submitSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?search=${keyword}`);
      setIsSearchOpen(false);
      setKeyword('');
    } else {
      navigate('/shop');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <header className="bg-primary dark:bg-dark text-light sticky top-0 z-50 shadow-md transition-colors duration-300 border-b border-white/5">
      {/* Top Bar */}
      <div className="bg-secondary/20 dark:bg-black text-xs py-2 px-4 flex justify-between items-center text-gray-200">
        <div className="flex items-center space-x-4">
          <span className="flex items-center"><Phone size={14} className="mr-1 text-secondary" /> 9450112628</span>
          <span className="hidden md:inline">Sabji Mandi Market, Mulayam Nagar, Lucknow</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">25+ Years of Excellence in <span className="text-secondary font-bold">Eye Care</span></span>
          <Link to="/book-eye-test" className="text-primary bg-secondary px-3 py-1 rounded font-bold hover:bg-white hover:text-primary transition duration-300 shadow-sm ml-2">Book Eye Test</Link>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        
        {/* Left Column: Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="text-xl md:text-2xl font-black tracking-widest flex items-center z-10 group">
            <img src="/logo.png" alt="Logo" className="h-8 md:h-10 w-auto mr-2 transition-transform group-hover:scale-110" onError={(e) => e.target.style.display = 'none'} />
            <span className="text-white hidden sm:inline">SANDEEP</span>
            <span className="text-secondary ml-1 font-light tracking-wide hidden sm:inline">OPTICALS</span>
          </Link>
        </div>

        {/* Center Column: Desktop Menu */}
        <div className={`hidden lg:flex flex-[2] justify-center items-center space-x-8 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none absolute' : 'opacity-100 relative'}`}>
          <Link to="/" className="text-[13px] font-bold uppercase tracking-widest text-gray-300 hover:text-secondary transition duration-300">Home</Link>
          <Link to="/eyeglasses" className="text-[13px] font-bold uppercase tracking-widest text-gray-300 hover:text-secondary transition duration-300">Eyeglasses</Link>
          <Link to="/sunglasses" className="text-[13px] font-bold uppercase tracking-widest text-gray-300 hover:text-secondary transition duration-300">Sunglasses</Link>
          <Link to="/computer-glasses" className="text-[13px] font-bold uppercase tracking-widest text-gray-300 hover:text-secondary transition duration-300">Computer</Link>
          <Link to="/contact-lenses" className="text-[13px] font-bold uppercase tracking-widest text-gray-300 hover:text-secondary transition duration-300">Lenses</Link>
        </div>

        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <form onSubmit={submitSearch} className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-lg hidden lg:flex items-center z-20">
            <input 
              type="text" 
              placeholder="Search for premium eyewear..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full py-2 px-6 rounded-l-full bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:border-secondary transition-colors placeholder-gray-400 text-sm"
              autoFocus
            />
            <button type="submit" className="bg-secondary text-primary px-5 py-2 rounded-r-full font-bold hover:bg-white transition-colors border border-secondary text-sm">
              Search
            </button>
            <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-4 text-gray-300 hover:text-white transition-transform hover:rotate-90">
              <X size={20} />
            </button>
          </form>
        )}

        {/* Right Column: Icons & Actions */}
        <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-5 z-10">
          <button onClick={toggleTheme} aria-label="Toggle Theme" className="text-gray-300 hover:text-secondary transition duration-300 flex items-center" title={`Current theme: ${theme}`}>
            {theme === 'light' ? <Sun size={18} /> : theme === 'dark' ? <Moon size={18} /> : <Monitor size={18} />}
          </button>
          
          {!isSearchOpen && (
            <button aria-label="Search" onClick={() => setIsSearchOpen(true)} className="hidden md:block">
              <Search size={18} className="text-gray-300 hover:text-secondary transition duration-300" />
            </button>
          )}
          <Link to="/cart" aria-label="Cart" className="relative group">
            <ShoppingCart size={18} className="group-hover:text-silver transition duration-300 text-gray-300" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center group-hover:scale-110 transition-transform">0</span>
          </Link>
          
          {user && user.isAdmin && (
            <Link to="/admin/dashboard" className="hidden xl:block text-[11px] font-bold uppercase tracking-wider bg-secondary/20 text-white px-2.5 py-1 rounded border border-secondary/50 hover:bg-secondary hover:text-white transition-all duration-300">
              Admin
            </Link>
          )}

          {user ? (
            <div className="relative group cursor-pointer hidden sm:block">
              <div className="flex items-center space-x-1 bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">
                <User size={14} />
                <span className="text-[13px] font-semibold">{user.name.split(' ')[0]}</span>
              </div>
              <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                <div className="bg-white rounded-xl shadow-xl py-2 text-dark border border-gray-100 transform origin-top-right transition-all">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-sm font-bold">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  {user.isAdmin && (
                    <Link to="/admin/dashboard" className="xl:hidden block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary font-medium transition-colors text-secondary">Admin Dashboard</Link>
                  )}
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary font-medium transition-colors">My Profile & Orders</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" aria-label="Login" className="hidden sm:flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-full hover:bg-white text-white hover:text-primary transition-all duration-300 font-semibold text-[13px]">
              <User size={14} />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary pb-4 px-4 space-y-3">
          <Link to="/eyeglasses" className="block text-white hover:text-silver" onClick={() => setIsMenuOpen(false)}>Eyeglasses</Link>
          <Link to="/computer-glasses" className="block text-white hover:text-silver" onClick={() => setIsMenuOpen(false)}>Computer Glasses</Link>
          <Link to="/sunglasses" className="block text-white hover:text-silver" onClick={() => setIsMenuOpen(false)}>Sunglasses</Link>
          <Link to="/contact-lenses" className="block text-white hover:text-silver" onClick={() => setIsMenuOpen(false)}>Contact Lenses</Link>
          <Link to="/book-eye-test" className="block text-primary bg-light px-4 py-2 rounded font-semibold text-center mt-4" onClick={() => setIsMenuOpen(false)}>Book Eye Test</Link>
          {user ? (
            <>
              <Link to="/profile" className="block text-white" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              {user.isAdmin && <Link to="/admin/dashboard" className="block text-white" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>}
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block text-white" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
