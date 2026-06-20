import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import useAuthStore from '../store/useAuthStore';
import { Calendar, Clock, MapPin, Eye } from 'lucide-react';

const BookEyeTest = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    date: '',
    preferredTime: 'Morning (10 AM - 1 PM)',
    notes: ''
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/api/appointments', formData);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment. Please try again or call us directly.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
      {/* Info Section */}
      <div className="lg:w-1/2">
        <h1 className="text-4xl font-bold text-primary mb-6">Book a Free Eye Test</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Comprehensive computerized eye testing by our expert optometrists. With over 25 years of experience, we guarantee precise vision measurement and consultation.
        </p>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
              <Eye size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Detailed Examination</h3>
              <p className="text-gray-600 text-sm">We use the latest technology to ensure your prescription is 100% accurate.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Store Location</h3>
              <p className="text-gray-600 text-sm">Sabji Mandi Market, Mulayam Nagar, Lucknow, Uttar Pradesh</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Operating Hours</h3>
              <p className="text-gray-600 text-sm">Monday – Sunday: 10:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="lg:w-1/2">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {success ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Requested!</h2>
              <p className="text-gray-600 mb-6">We have received your request. Our team will contact you shortly to confirm your exact time slot.</p>
              <button onClick={() => setSuccess(false)} className="text-primary font-bold hover:underline">Book Another</button>
            </div>
          ) : (
            <form onSubmit={submitHandler} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-3 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-3 border" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-3 border" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-3 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-3 border bg-white">
                    <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                    <option value="Evening (5 PM - 9 PM)">Evening (5 PM - 9 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Any specific eye problems? (Optional)</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-3 border"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-secondary transition flex justify-center items-center shadow-lg"
              >
                {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Confirm Booking Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookEyeTest;
