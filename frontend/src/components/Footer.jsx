import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-silver pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-light text-xl font-bold mb-4 tracking-wider flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-2" onError={(e) => e.target.style.display = 'none'} />
            SANDEEP <span className="font-light text-secondary ml-1">OPTICALS</span>
          </h3>
          <p className="text-sm leading-relaxed mb-4 text-gray-400">
            For more than 25 years, Sandeep Opticals has been helping customers achieve better vision through quality eyewear, accurate eye testing, and premium lenses.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition duration-300"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition duration-300"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition duration-300"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-light text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-white transition duration-300">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white transition duration-300">Our Services</Link></li>
            <li><Link to="/book-eye-test" className="hover:text-white transition duration-300">Book Eye Test</Link></li>
            <li><Link to="/contact" className="hover:text-white transition duration-300">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-white transition duration-300">FAQs</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-light text-lg font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/eyeglasses" className="hover:text-white transition duration-300">Eyeglasses</Link></li>
            <li><Link to="/sunglasses" className="hover:text-white transition duration-300">Sunglasses</Link></li>
            <li><Link to="/computer-glasses" className="hover:text-white transition duration-300">Computer Glasses</Link></li>
            <li><Link to="/contact-lenses" className="hover:text-white transition duration-300">Contact Lenses</Link></li>
            <li><Link to="/accessories" className="hover:text-white transition duration-300">Accessories</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-light text-lg font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start">
              <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
              <span>Sabji Mandi Market, Mulayam Nagar, Lucknow, Uttar Pradesh, India</span>
            </li>
            <li className="flex items-center">
              <Phone size={18} className="mr-2 flex-shrink-0" />
              <span>+91 9450112628</span>
            </li>
            <li className="flex items-center">
              <Mail size={18} className="mr-2 flex-shrink-0" />
              <span>sandeep112628@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Sandeep Opticals. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
