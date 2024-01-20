const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");
const validateNewProductInput = require("../../validation/productValidation");

router.get("/productlist", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});

router.post("/newproduct", (req, res) => {
  const { errors, isValid } = validateNewProductInput(req.body);

  if (!isValid) {
    return res.status(400).json({ error: 'Validation Error', validationErrors: errors });
  }
  const newProduct = new Product(req.body);
  
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: 'Bad Request' });
    });
});

router.post('/newproducts', async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const insertedProducts = await Product.insertMany(products);

    res.status(201).json({ message: 'Products added successfully', insertedProducts });
  } catch (error) {
    console.error('Error adding products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
