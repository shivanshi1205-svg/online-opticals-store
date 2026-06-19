import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useProductStore from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown } from 'lucide-react';

const CategoryBanner = ({ category }) => {
  const banners = {
    'Eyeglasses': {
      title: 'Premium Eyeglasses',
      subtitle: 'Crafted for perfect vision and impeccable style.',
      img: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1600'
    },
    'Sunglasses': {
      title: 'Luxury Sunglasses',
      subtitle: 'Ultimate UV protection meets high-end fashion.',
      img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1600'
    },
    'Computer Glasses': {
      title: 'Digital Screen Protection',
      subtitle: 'Advanced Blue-cut lenses for the modern professional.',
      img: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1600'
    },
    'Contact Lenses': {
      title: 'Contact Lenses',
      subtitle: 'Seamless vision without boundaries.',
      img: 'https://images.unsplash.com/photo-1557002665-c552e1832483?auto=format&fit=crop&q=80&w=1600'
    },
    'default': {
      title: 'The Full Collection',
      subtitle: 'Discover our complete range of premium eyewear.',
      img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1600'
    }
  };

  const activeBanner = banners[category] || banners['default'];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={category || 'all'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="w-full h-64 md:h-80 rounded-3xl overflow-hidden relative mb-10 shadow-2xl flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img src={activeBanner.img} alt={activeBanner.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" />
        <div className="relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block px-4 py-1 border border-secondary text-secondary uppercase tracking-widest text-xs font-bold rounded-full mb-4 bg-black/30 backdrop-blur-sm"
          >
            Curated Collection
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-lg">{activeBanner.title}</h1>
          <p className="text-lg text-gray-200 font-light max-w-2xl mx-auto drop-shadow-md">{activeBanner.subtitle}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Shop = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();

  // Parse URL query parameters for initial filters
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('search') || '';
  
  const [filters, setFilters] = useState({
    category: categoryParam || '',
    frameType: '',
    frameShape: '',
    sort: 'newest'
  });

  useEffect(() => {
    fetchProducts(searchParam, '', filters);
  }, [filters, searchParam, fetchProducts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-light dark:bg-dark transition-colors duration-300">
      
      {/* Dynamic Category Banner */}
      <CategoryBanner category={filters.category} />

      <div className="flex flex-col md:flex-row">
        {/* Mobile Filter Toggle */}
        <button 
          className="md:hidden flex items-center justify-center w-full bg-white dark:bg-primary p-4 mb-6 rounded-xl shadow-sm text-primary dark:text-secondary font-bold tracking-wider"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} className="mr-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Sidebar Filters */}
        <aside className={`w-full md:w-72 flex-shrink-0 md:mr-10 ${showFilters ? 'block' : 'hidden md:block'}`}>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Filters</h2>
          
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm text-gray-700 mb-3 flex items-center justify-between">
              CATEGORY <ChevronDown size={14} />
            </h3>
            <div className="space-y-2">
              {['Eyeglasses', 'Sunglasses', 'Computer Glasses', 'Contact Lenses'].map(cat => (
                <label key={cat} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category" 
                    value={cat} 
                    checked={filters.category === cat}
                    onChange={handleFilterChange}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>{cat}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value="" 
                  checked={filters.category === ''}
                  onChange={handleFilterChange}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>All Categories</span>
              </label>
            </div>
          </div>

          {/* Frame Type Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm text-gray-700 mb-3 flex items-center justify-between">
              FRAME TYPE <ChevronDown size={14} />
            </h3>
            <div className="space-y-2">
              {['Full-Rim', 'Half-Rim', 'Rimless'].map(type => (
                <label key={type} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="frameType" 
                    value={type} 
                    checked={filters.frameType === type}
                    onChange={handleFilterChange}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>{type}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                <input 
                  type="radio" 
                  name="frameType" 
                  value="" 
                  checked={filters.frameType === ''}
                  onChange={handleFilterChange}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>All Types</span>
              </label>
            </div>
          </div>
          
          {/* Frame Shape Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm text-gray-700 mb-3 flex items-center justify-between">
              FRAME SHAPE <ChevronDown size={14} />
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['Rectangle', 'Round', 'Cat Eye', 'Aviator', 'Square', 'Wayfarer'].map(shape => (
                <label key={shape} className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer bg-gray-50 p-2 rounded border hover:border-primary">
                  <input 
                    type="radio" 
                    name="frameShape" 
                    value={shape} 
                    checked={filters.frameShape === shape}
                    onChange={handleFilterChange}
                    className="sr-only"
                  />
                  <span className={`${filters.frameShape === shape ? 'font-bold text-primary' : ''}`}>{shape}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600">Showing <span className="font-bold text-primary">{products.length}</span> results</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select 
              name="sort" 
              value={filters.sort} 
              onChange={handleFilterChange}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
        ) : products.length === 0 ? (
          <div className="bg-gray-50 p-10 text-center rounded-xl border border-dashed border-gray-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
            <button 
              onClick={() => setFilters({category: '', frameType: '', frameShape: '', sort: 'newest'})}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Shop;
