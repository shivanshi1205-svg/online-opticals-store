import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { Trash2, ShoppingCart, MessageCircle } from 'lucide-react';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Generate WhatsApp Message with Cart Details
    let message = "Hi Sandeep Opticals, I want to order the following items:%0A%0A";
    let total = 0;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Qty: ${item.qty} - ₹${item.price * item.qty}%0A`;
      total += item.price * item.qty;
    });
    
    message += `%0A*Total: ₹${total}*`;
    
    window.open(`https://wa.me/919450112628?text=${message}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <ShoppingCart className="mr-3 text-primary" size={32} /> Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-600 mb-4">Your cart is currently empty</h2>
          <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <li key={item.product} className="p-6 flex flex-col sm:flex-row items-center">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0" />
                    <div className="sm:ml-6 flex-1 text-center sm:text-left">
                      <Link to={`/product/${item.product}`} className="text-lg font-semibold text-primary hover:underline">
                        {item.name}
                      </Link>
                      <div className="text-gray-600 mt-1 font-bold">₹{item.price}</div>
                    </div>
                    <div className="flex items-center mt-4 sm:mt-0 space-x-6">
                      <select 
                        value={item.qty} 
                        onChange={(e) => addToCart({ ...item, _id: item.product, discountPrice: item.price, countInStock: item.countInStock }, Number(e.target.value))}
                        className="border border-gray-300 rounded p-2 focus:ring-primary"
                      >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                      </select>
                      <button onClick={() => removeFromCart(item.product)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-gray-600">
                <div className="flex justify-between">
                  <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                  <span className="font-semibold text-gray-800">₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-100 text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-[#25D366] text-white py-4 rounded-lg font-bold hover:bg-green-600 transition flex justify-center items-center shadow-lg"
              >
                <MessageCircle className="mr-2" /> Checkout via WhatsApp
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                For a personalized experience and secure transaction, we currently process all orders through our official WhatsApp business account.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
