const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
// const Category = require('../models/Category');// Here I am getting error OverwriteModelError as schema again compiled

// Create a new product with a dynamic categoryId
// router.post('/add-product', async (req, res) => {S
//   const { name, description, price, stockQuantity, categoryId, imageUrl } = req.body;

//   try {
//     // Check if the categoryId exists in the Category collection
//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     // Create a new product
//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       stockQuantity,
//       categoryId,
//       imageUrl
//     });

//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


router.post('/', async (req, res) => {
  try {
      const product = new Product(req.body);
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
      const product = await Product.find();
      if (product) {
          res.json(product);
      } else {
          res.status(404).json({ message: 'Product not found' });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


router.get('/products-by-category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ _categoryId: req.params.categoryId }).populate({
      path: '_categoryId',
      populate: { path: '_parentCategoryId' } // Nested population for parent category
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProduct);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (product) {
          await product.deleteOne();
          res.json({ message: 'Product deleted' });
      } else {
          res.status(404).json({ message: 'Product not found' });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


module.exports = router;
