import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, ShieldCheck, Clock, Award, Star, ChevronRight } from 'lucide-react';
import useProductStore from '../store/useProductStore';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts('', '', { sort: 'newest' });
  }, [fetchProducts]);
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-primary text-light min-h-[85vh] flex items-center overflow-hidden">
        {/* Abstract Background Shapes (Optimized for Performance) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-secondary/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-[55%] text-center md:text-left mb-12 md:mb-0 z-20"
          >
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <span className="text-silver font-semibold tracking-wider text-sm uppercase">Premium Eyewear Collection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
              See the World <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-white">Clearly.</span>
            </h1>
            <p className="text-lg md:text-2xl mb-10 text-gray-300 font-light max-w-xl leading-relaxed">
              Experience the perfect blend of style and vision. Trusted eye care in Lucknow for over 25 years.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
              <Link to="/shop" className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-silver hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Explore Collection
              </Link>
              <Link to="/book-eye-test" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 hover:scale-105 transition-all duration-300">
                Book Eye Test
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="md:w-[45%] flex justify-center relative z-20"
          >
            {/* Glassmorphic Image Container */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 p-6 shadow-2xl flex items-center justify-center transform hover:rotate-2 transition-transform duration-700">
              <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800" alt="Premium Eyewear" className="w-full h-full object-cover rounded-2xl shadow-inner" />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center space-x-3"
              >
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Eye size={24} />
                </div>
                <div>
                  <p className="text-dark font-bold text-sm">Computerized Testing</p>
                  <p className="text-gray-500 text-xs">100% Accuracy</p>
                </div>
              </motion.div>

               {/* Floating Badge 2 */}
               <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-secondary text-white p-4 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center"
              >
                <span className="text-2xl font-black">25+</span>
                <span className="text-xs tracking-wider uppercase opacity-80">Years</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Luxury Brands Marquee */}
      <div className="bg-dark text-white py-6 border-y border-white/10 overflow-hidden flex whitespace-nowrap relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>
        <div className="animate-marquee inline-flex items-center space-x-16 px-8 text-2xl md:text-3xl font-black uppercase tracking-widest opacity-60">
          <span>Ray-Ban</span>
          <span>•</span>
          <span>Oakley</span>
          <span>•</span>
          <span>Fastrack</span>
          <span>•</span>
          <span>Lenskart Blu</span>
          <span>•</span>
          <span>Vincent Chase</span>
          <span>•</span>
          <span>Bausch & Lomb</span>
          <span>•</span>
          <span>FreshLook</span>
          <span>•</span>
          <span>Ray-Ban</span>
          <span>•</span>
          <span>Oakley</span>
          <span>•</span>
          <span>Fastrack</span>
          <span>•</span>
          <span>Lenskart Blu</span>
          <span>•</span>
          <span>Vincent Chase</span>
          <span>•</span>
          <span>Bausch & Lomb</span>
          <span>•</span>
          <span>FreshLook</span>
        </div>
      </div>

      {/* Services Categories */}
      <section className="py-16 bg-gray-50 dark:bg-[#121212]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary dark:text-secondary mb-12">Our Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Eyeglasses', img: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=400', link: '/eyeglasses' },
              { name: 'Computer Glasses', img: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=400', link: '/computer-glasses' },
              { name: 'Sunglasses', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400', link: '/sunglasses' },
              { name: 'Contact Lenses', img: 'https://images.unsplash.com/photo-1557002665-c552e1832483?auto=format&fit=crop&q=80&w=400', link: '/contact-lenses' }
            ].map((cat, index) => (
              <Link to={cat.link} key={index}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg p-6 text-center cursor-pointer border border-gray-100 dark:border-[#333] hover:border-secondary dark:hover:border-secondary transition-all h-full group"
                >
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 dark:bg-black rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-100 dark:border-[#333]">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <h3 className="font-semibold text-lg text-primary dark:text-white group-hover:text-secondary transition-colors">{cat.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 group-hover:text-secondary">Explore &rarr;</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Frame Shape */}
      <section className="py-12 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-dark dark:text-white">Shop by Frame Shape</h2>
            <Link to="/shop" className="text-secondary font-semibold flex items-center hover:text-primary dark:hover:text-white transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex overflow-x-auto pb-4 space-x-6 hide-scrollbar">
            {[
              { name: 'Rectangle', img: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=200' },
              { name: 'Round', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=200' },
              { name: 'Cat Eye', img: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=200' },
              { name: 'Aviator', img: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=200' }
            ].map((shape, idx) => (
              <Link to={`/shop?frameShape=${shape.name}`} key={idx} className="flex-none w-32 group">
                <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-lg p-4 mb-3 border border-gray-100 dark:border-[#333] group-hover:border-secondary transition-colors">
                  <img src={shape.img} alt={shape.name} className="w-full h-auto mix-blend-multiply dark:mix-blend-normal rounded" />
                </div>
                <p className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-secondary">{shape.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Slider */}
      <section className="py-16 bg-gray-50 dark:bg-[#121212] border-y border-gray-200 dark:border-[#333]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-2">Trending Right Now</h2>
              <p className="text-gray-500 dark:text-gray-400">Explore our most popular and newly arrived eyewear.</p>
            </div>
            <Link to="/shop" className="hidden md:flex text-white bg-primary dark:bg-secondary dark:text-dark px-6 py-2 rounded-full font-semibold hover:bg-secondary dark:hover:bg-white transition-colors items-center">
              Explore All <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary dark:border-secondary"></div>
            </div>
          ) : (
            <div className="flex overflow-x-auto pb-8 space-x-6 hide-scrollbar snap-x">
              {products.slice(0, 6).map(product => (
                <div key={product._id} className="flex-none w-72 snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">Why Choose Sandeep Opticals?</h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#333] hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary dark:bg-secondary text-silver dark:text-dark rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-3">25+ Years Experience</h3>
              <p className="text-gray-600 dark:text-gray-400">A legacy of trust and excellence in eye care serving the community of Mulayam Nagar.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#333] hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary dark:bg-secondary text-silver dark:text-dark rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Eye size={32} />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-3">Computerized Testing</h3>
              <p className="text-gray-600 dark:text-gray-400">State-of-the-art equipment for precise vision consultation and prescription.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#333] hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary dark:bg-secondary text-silver dark:text-dark rounded-full flex items-center justify-center mb-6 shadow-lg">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-3">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">We offer top brands and the highest quality lenses including Blue Cut and Progressive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary dark:bg-[#1a1a1a] text-light border-t border-secondary dark:border-[#333]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary dark:text-secondary">Need a Contact Lens Consultation?</h2>
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Our specialists can help you find the perfect daily, monthly, or yearly disposable lenses tailored to your eyes.
          </p>
          <Link to="/book-eye-test" className="bg-primary dark:bg-secondary text-white dark:text-dark px-8 py-4 rounded-full font-bold hover:bg-dark dark:hover:bg-white transition duration-300 shadow-xl inline-block">
            Schedule an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
