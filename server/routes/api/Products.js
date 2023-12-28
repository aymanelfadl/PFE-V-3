const express = require("express");
const router = express.Router();


const Product = require("../../models/Product");

router.get("/productlist", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});

router.post("/newproduct", (req, res) => {
    console.log("Request Body:", req.body); // Log the request body
  
    const newProduct = new Product(req.body);
  
    newProduct
      .save()
      .then((product) => res.json(product))
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: "Bad Request" });
      });
  });
  

module.exports = router;
