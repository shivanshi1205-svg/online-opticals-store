import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance';

const useProductStore = create((set) => ({
  products: [],
  product: null,
  pages: 1,
  page: 1,
  loading: false,
  error: null,

  fetchProducts: async (keyword = '', pageNumber = '', filters = {}) => {
    set({ loading: true, error: null });
    try {
      let queryStr = `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`;
      if (filters.category) queryStr += `&category=${filters.category}`;
      if (filters.frameType) queryStr += `&frameType=${filters.frameType}`;
      if (filters.sort) queryStr += `&sort=${filters.sort}`;
      // Add other filters as needed

      const { data } = await axiosInstance.get(queryStr);
      set({
        products: data.products,
        pages: data.pages,
        page: data.page,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  fetchProductDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get(`/api/products/${id}`);
      set({ product: data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },
}));

export default useProductStore;
