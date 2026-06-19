import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Order from './models/Order.js';
import Appointment from './models/Appointment.js';
import connectDB from './config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await Appointment.deleteMany();

    // Create Admin User
    const adminUser = await User.create({
      name: 'Admin Sandeep',
      email: 'admin@sandeepopticals.com',
      password: '123456',
      isAdmin: true,
    });

    // Create Sample Categories
    const category1 = await Category.create({ name: 'Eyeglasses', description: 'Prescription Glasses' });
    const category2 = await Category.create({ name: 'Sunglasses', description: 'UV Protection' });
    const category3 = await Category.create({ name: 'Computer Glasses', description: 'Blue Light Blocking' });
    const category4 = await Category.create({ name: 'Contact Lenses', description: 'Daily, Monthly, Yearly' });

    // Create Sample Products
    const sampleProducts = [
      // Eyeglasses (Cheap to Expensive)
      {
        name: 'Basic Reading Glasses',
        brand: 'Generic',
        category: category1._id,
        frameType: 'Full-Rim',
        frameShape: 'Rectangle',
        lensType: 'Standard',
        gender: 'Unisex',
        price: 499,
        discountPrice: 299,
        description: 'Affordable and durable reading glasses for everyday use.',
        images: [{ url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800' }],
        countInStock: 50,
      },
      {
        name: 'Stylish Half-Rim Eyewear',
        brand: 'Vincent Chase',
        category: category1._id,
        frameType: 'Half-Rim',
        frameShape: 'Wayfarer',
        lensType: 'Anti-Glare',
        gender: 'Men',
        price: 1500,
        discountPrice: 999,
        description: 'Modern half-rim design for a professional look.',
        images: [{ url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800' }],
        countInStock: 20,
      },
      {
        name: 'Titanium Premium Frames',
        brand: 'Oakley',
        category: category1._id,
        frameType: 'Rimless',
        frameShape: 'Round',
        lensType: 'Progressive',
        gender: 'Unisex',
        price: 8500,
        discountPrice: 7999,
        description: 'Ultra-lightweight premium titanium frames for maximum comfort.',
        images: [{ url: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800' }],
        countInStock: 5,
      },

      // Sunglasses (Cheap to Expensive)
      {
        name: 'Summer Vibes Sunglasses',
        brand: 'Generic',
        category: category2._id,
        frameType: 'Full-Rim',
        frameShape: 'Cat Eye',
        lensType: 'Tinted',
        gender: 'Women',
        price: 699,
        discountPrice: 499,
        description: 'Trendy cat-eye sunglasses for casual outings.',
        images: [{ url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800' }],
        countInStock: 30,
      },
      {
        name: 'Polarized Sports Sunglasses',
        brand: 'Fastrack',
        category: category2._id,
        frameType: 'Wrap',
        frameShape: 'Oval',
        lensType: 'Polarized',
        gender: 'Men',
        price: 2499,
        discountPrice: 1899,
        description: 'Perfect for biking and outdoor sports with 100% glare reduction.',
        images: [{ url: 'https://images.unsplash.com/photo-1589810635657-232948472d98?auto=format&fit=crop&q=80&w=800' }],
        countInStock: 15,
      },
      {
        name: 'Classic Aviator 2.0',
        brand: 'Ray-Ban',
        category: category2._id,
        frameType: 'Full-Rim',
        frameShape: 'Aviator',
        lensType: 'UV Protection',
        gender: 'Unisex',
        price: 6500,
        discountPrice: 5999,
        description: 'The iconic aviator sunglasses with premium gold-plated frames.',
        images: [{ url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800' }],
        countInStock: 10,
      },

      // Computer Glasses
      {
        name: 'Zero Power Blue Cut',
        brand: 'Lenskart Blu',
        category: category3._id,
        frameType: 'Full-Rim',
        frameShape: 'Rectangle',
        lensType: 'Blue Cut',
        gender: 'Unisex',
        price: 1200,
        discountPrice: 899,
        description: 'Blocks harmful blue light from laptops and mobile phones.',
        images: [{ url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800' }],
        countInStock: 40,
      },

      // Contact Lenses (Cheap to Expensive)
      {
        name: 'Clear Daily Disposables (10 Pairs)',
        brand: 'Bausch & Lomb',
        category: category4._id,
        frameType: 'N/A',
        frameShape: 'N/A',
        lensType: 'Spherical',
        gender: 'Unisex',
        price: 900,
        discountPrice: 750,
        description: 'High-water content daily disposable lenses for ultimate comfort.',
        images: [{ url: 'https://images.unsplash.com/photo-1557002665-c552e1832483?auto=format&fit=crop&q=80&w=800' }],
        countInStock: 100,
      },
      {
        name: 'Colored Monthly Lenses (Aqua)',
        brand: 'FreshLook',
        category: category4._id,
        frameType: 'N/A',
        frameShape: 'N/A',
        lensType: 'Color',
        gender: 'Unisex',
        price: 1800,
        discountPrice: 1500,
        description: 'Beautiful Aqua color contact lenses valid for 30 days of wear.',
        images: [{ url: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=800' }],
        countInStock: 25,
      }
    ];

    await Product.insertMany(sampleProducts);

    console.log('Data Imported successfully! You can login with admin@sandeepopticals.com / 123456');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
