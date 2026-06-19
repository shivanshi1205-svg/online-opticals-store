import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
  paymentMethod: 'WhatsApp', // Default

  addToCart: (product, qty = 1) => {
    const item = {
      product: product._id,
      name: product.name,
      image: product.images[0]?.url,
      price: product.discountPrice > 0 ? product.discountPrice : product.price,
      countInStock: product.countInStock,
      qty,
    };

    set((state) => {
      const existItem = state.cartItems.find((x) => x.product === item.product);

      let newItems;
      if (existItem) {
        newItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        newItems = [...state.cartItems, item];
      }

      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return { cartItems: newItems };
    });
  },

  removeFromCart: (id) => {
    set((state) => {
      const newItems = state.cartItems.filter((x) => x.product !== id);
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return { cartItems: newItems };
    });
  },

  saveShippingAddress: (data) => {
    set({ shippingAddress: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem('cartItems');
  },
}));

export default useCartStore;
