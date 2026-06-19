import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import useProductStore from '../../store/useProductStore';
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';

const AdminProducts = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const { user } = useAuthStore();
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProductHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('/api/products', {}, config);
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error(error);
      alert('Failed to create product');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setDeleteLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(`/api/products/${id}`, config);
        fetchProducts();
      } catch (error) {
        console.error(error);
        alert('Failed to delete product');
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button 
          onClick={createProductHandler}
          className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg flex items-center transition"
        >
          <Plus size={18} className="mr-2" /> Add New Product
        </button>
      </div>

      {loading || deleteLoading ? (
        <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">NAME</th>
                  <th className="p-4 font-semibold">PRICE</th>
                  <th className="p-4 font-semibold">CATEGORY</th>
                  <th className="p-4 font-semibold">BRAND</th>
                  <th className="p-4 font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-gray-500 font-mono text-xs">{product._id.substring(0, 8)}...</td>
                    <td className="p-4 font-medium text-gray-800">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded mr-3 overflow-hidden">
                          {product.images && product.images.length > 0 && (
                            <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        {product.name}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">₹{product.price}</td>
                    <td className="p-4 text-gray-600">{product.category?.name || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{product.brand}</td>
                    <td className="p-4 text-right flex justify-end space-x-2">
                      <Link to={`/admin/product/${product._id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => deleteHandler(product._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
