const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
  role: String,
  permissions: [{type:String}]

})

module.exports = mongoose.model('roles', roleSchema)