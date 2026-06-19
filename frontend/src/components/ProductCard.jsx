import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full group relative"
    >
      {/* Favorite Button Overlay */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <Heart size={18} />
      </button>

      <Link to={`/product/${product._id}`} className="relative block h-56 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center p-6">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0].url} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
        {product.discountPrice > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-md">
            Sale
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow relative bg-white">
        <div className="text-[10px] uppercase tracking-widest text-secondary/60 font-bold mb-1">{product.brand}</div>
        <Link to={`/product/${product._id}`}>
          <h3 className="font-bold text-gray-800 mb-2 hover:text-primary line-clamp-2 transition-colors text-sm md:text-base leading-snug">{product.name}</h3>
        </Link>
        
        <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-50 relative overflow-hidden">
          <div className="flex flex-col">
            {product.discountPrice > 0 ? (
              <>
                <span className="text-xs text-gray-400 line-through mb-0.5">₹{product.price}</span>
                <span className="text-lg font-extrabold text-primary">₹{product.discountPrice}</span>
              </>
            ) : (
              <span className="text-lg font-extrabold text-primary">₹{product.price}</span>
            )}
          </div>
          
          <button className="w-10 h-10 bg-primary/5 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
