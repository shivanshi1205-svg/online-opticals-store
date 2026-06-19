import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';
import { ArrowLeft, Upload } from 'lucide-react';

const ProductEdit = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [frameType, setFrameType] = useState('N/A');
  const [frameShape, setFrameShape] = useState('N/A');
  const [lensType, setLensType] = useState('Standard');
  const [gender, setGender] = useState('Unisex');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setDiscountPrice(data.discountPrice);
        setImage(data.images && data.images.length > 0 ? data.images[0].url : '');
        setBrand(data.brand);
        setCategory(data.category?._id || '');
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setFrameType(data.frameType);
        setFrameShape(data.frameShape);
        setLensType(data.lensType);
        setGender(data.gender);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [productId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(
        `/api/products/${productId}`,
        {
          name, price, discountPrice, description, brand, category,
          countInStock, frameType, frameShape, lensType, gender,
          images: [{ url: image, altText: name }]
        },
        config
      );
      alert('Product updated successfully');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Failed to update product');
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary mb-6 transition">
        <ArrowLeft size={18} className="mr-2" /> Back to Products
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input type="text" required value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (₹)</label>
              <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (₹)</label>
              <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Count</label>
              <input type="number" required value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frame Type</label>
              <select value={frameType} onChange={(e) => setFrameType(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border">
                {['Rimless', 'Half-Rim', 'Full-Rim', 'N/A'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frame Shape</label>
              <select value={frameShape} onChange={(e) => setFrameShape(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border">
                {['Rectangle', 'Round', 'Cat Eye', 'Aviator', 'Square', 'Oversized', 'Wayfarer', 'N/A'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lens Type</label>
              <input type="text" value={lensType} onChange={(e) => setLensType(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border">
                {['Men', 'Women', 'Kids', 'Unisex'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL or Upload</label>
            <div className="flex items-center space-x-4">
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" placeholder="Enter image URL" />
              <label className="cursor-pointer bg-secondary text-white px-4 py-2 rounded flex items-center hover:bg-primary transition">
                <Upload size={18} className="mr-2" /> Upload
                <input type="file" onChange={uploadFileHandler} className="hidden" />
              </label>
            </div>
            {uploading && <span className="text-sm text-blue-500 mt-2 block">Uploading...</span>}
            {image && (
              <div className="mt-4 w-32 h-32 border rounded overflow-hidden">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea required rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border"></textarea>
          </div>

          <div className="pt-4 border-t">
            <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary transition w-full md:w-auto">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
