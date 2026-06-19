import Product from '../models/Product.js';

// @desc    Fetch all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};
    const frameType = req.query.frameType ? { frameType: req.query.frameType } : {};
    const lensType = req.query.lensType ? { lensType: req.query.lensType } : {};
    const gender = req.query.gender ? { gender: req.query.gender } : {};

    // Filter logic
    const filter = { ...keyword, ...category, ...frameType, ...lensType, ...gender };

    // Sorting logic
    let sort = {};
    if (req.query.sort === 'price_asc') sort = { price: 1 };
    else if (req.query.sort === 'price_desc') sort = { price: -1 };
    else if (req.query.sort === 'newest') sort = { createdAt: -1 };
    else sort = { createdAt: -1 };

    const count = await Product.countDocuments({ ...filter });
    const products = await Product.find({ ...filter })
      .populate('category', 'name')
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize), count });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      images: [],
      brand: 'Sample brand',
      category: req.body.category || null,
      countInStock: 0,
      description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      discountPrice,
      description,
      images,
      brand,
      category,
      countInStock,
      frameType,
      frameShape,
      lensType,
      gender,
      isFeatured,
      isBestSeller,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.description = description || product.description;
      product.images = images || product.images;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      product.frameType = frameType || product.frameType;
      product.frameShape = frameShape || product.frameShape;
      product.lensType = lensType || product.lensType;
      product.gender = gender || product.gender;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isBestSeller = isBestSeller !== undefined ? isBestSeller : product.isBestSeller;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};
