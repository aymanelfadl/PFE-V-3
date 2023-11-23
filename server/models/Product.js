const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    supplier: {
        name: {
            type: String,
            required: true
        },
        contactInfo: {
            type: String,
            required: true
        } 
    },
    costPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    quantityInStock: {
        type: Number,
        required: true
    }
});

module.exports = Product = mongoose.model("products", ProductSchema);
