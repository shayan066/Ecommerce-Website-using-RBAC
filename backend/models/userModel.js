const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  url: {type:String},
  name: String,
  type: String,
  password: String,
  cart : [{type: mongoose.Schema.Types.ObjectId, ref: "Products"}],
  roles: [{type: String, ref: "roles"}]
})

module.exports = mongoose.model("users", userSchema)