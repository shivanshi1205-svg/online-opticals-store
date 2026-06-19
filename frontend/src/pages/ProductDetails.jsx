import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useProductStore from '../store/useProductStore';
import { ShoppingCart, Phone, MessageCircle, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error, fetchProductDetails } = useProductStore();
  const [mainImage, setMainImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetchProductDetails(id);
    window.scrollTo(0, 0);
  }, [id, fetchProductDetails]);

  useEffect(() => {
    if (product && product.category) {
      import('axios').then(({ default: axios }) => {
        const categoryId = product.category._id || product.category;
        axios.get(`/api/products?category=${categoryId}`).then(res => {
          setRelatedProducts(res.data.products.filter(p => p._id !== product._id).slice(0, 4));
        });
      });
    }
  }, [product]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0].url);
    }
  }, [product]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  if (error) {
    return <div className="container mx-auto p-8"><div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div></div>;
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary mb-6 transition">
        <ArrowLeft size={18} className="mr-2" /> Back to Shop
      </button>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Image Gallery */}
          <div className="w-full md:w-1/2 p-6 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50 flex flex-col">
            <div className="flex-1 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 overflow-hidden relative">
               {product.discountPrice > 0 && (
                 <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm z-10">
                   SALE
                 </div>
               )}
               {mainImage ? (
                 <img src={mainImage} alt={product.name} className="max-w-full max-h-96 object-contain" />
               ) : (
                 <div className="text-gray-400">No Image Available</div>
               )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto py-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setMainImage(img.url)}
                    className={`w-20 h-20 flex-shrink-0 bg-white rounded-lg border-2 overflow-hidden ${mainImage === img.url ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img.url} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
            <div className="mb-2 text-sm font-semibold text-secondary tracking-widest uppercase">{product.brand}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-end space-x-4 mb-6 pb-6 border-b border-gray-100">
              {product.discountPrice > 0 ? (
                <>
                  <span className="text-4xl font-bold text-gray-900">₹{product.discountPrice}</span>
                  <span className="text-xl text-gray-400 line-through mb-1">₹{product.price}</span>
                  <span className="text-sm font-semibold text-green-600 mb-2 bg-green-100 px-2 py-1 rounded">Save ₹{product.price - product.discountPrice}</span>
                </>
              ) : (
                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
              )}
            </div>

            <div className="space-y-4 mb-8 flex-1">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div><span className="text-gray-500">Category:</span> <span className="font-semibold">{product.category?.name || 'N/A'}</span></div>
                <div><span className="text-gray-500">Availability:</span> <span className={`font-semibold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span></div>
                <div><span className="text-gray-500">Frame Type:</span> <span className="font-semibold">{product.frameType}</span></div>
                <div><span className="text-gray-500">Frame Shape:</span> <span className="font-semibold">{product.frameShape}</span></div>
                <div><span className="text-gray-500">Lens Type:</span> <span className="font-semibold">{product.lensType}</span></div>
                <div><span className="text-gray-500">Gender:</span> <span className="font-semibold">{product.gender}</span></div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 mt-auto">
              <button 
                disabled={product.countInStock === 0}
                className={`w-full py-4 rounded-lg flex items-center justify-center text-lg font-bold transition duration-300 ${product.countInStock > 0 ? 'bg-primary text-white hover:bg-secondary shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                <ShoppingCart className="mr-2" /> Add to Cart
              </button>

              <div className="grid grid-cols-2 gap-4">
                <a 
                  href={`https://wa.me/919450112628?text=Hi, I'm interested in ${product.name} (ID: ${product._id})`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-[#25D366] text-white py-3 rounded-lg flex items-center justify-center font-semibold hover:bg-green-600 transition shadow-md"
                >
                  <MessageCircle className="mr-2" size={20} /> WhatsApp
                </a>
                <a 
                  href="tel:9450112628" 
                  className="w-full bg-white border-2 border-primary text-primary py-3 rounded-lg flex items-center justify-center font-semibold hover:bg-primary hover:text-white transition shadow-sm"
                >
                  <Phone className="mr-2" size={20} /> Call Now
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-gray-100 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck size={24} className="text-primary mb-2" />
                <span className="text-xs text-gray-500 font-medium">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck size={24} className="text-primary mb-2" />
                <span className="text-xs text-gray-500 font-medium">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw size={24} className="text-primary mb-2" />
                <span className="text-xs text-gray-500 font-medium">14 Days Return</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rp => (
              <Link to={`/product/${rp._id}`} key={rp._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-48 bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
                  <img src={rp.images[0]?.url} alt={rp.name} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{rp.brand}</div>
                  <h3 className="font-bold text-gray-800 text-sm truncate mb-2">{rp.name}</h3>
                  <div className="flex items-end space-x-2">
                    <span className="font-bold text-gray-900">₹{rp.discountPrice || rp.price}</span>
                    {rp.discountPrice > 0 && <span className="text-xs text-gray-400 line-through mb-0.5">₹{rp.price}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;
