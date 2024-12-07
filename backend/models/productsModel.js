const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  url: {type: String},
  name: String,
  category: String,
  seller: String,
  price: Number
})

module.exports = mongoose.model("Products", ProductSchema);

