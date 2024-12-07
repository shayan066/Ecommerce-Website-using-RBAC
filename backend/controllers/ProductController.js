// Build Product APIs (CRUD)

const productModel = require('../models/productsModel')

// Post (Create)
module.exports.addProduct = async (req, res) => {

  if(req.permissions.indexOf('add-product') === -1){
    return res.send({code: 401, message: "Unauthenticated"})
  }

  try {
    const newProduct = new productModel(req.body);
    const isSaved = await newProduct.save();
    if (isSaved) {
      res.send('saved');
      console.log(isSaved);
    } else {
      res.send('fail to save');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// Get (Read)
module.exports.getProduct = async (req,res) => {

  console.log(req.permissions, "20");

  if(req.permissions.indexOf('view-products') === -1){
    return res.send({code: 401, message: "Unauthenticated"})
  }
  
  const data = await productModel.find({})
  if (data.length > 0){
    res.send({code: 200, message: "Find Successfully", data: data})
  }
  else if (data.length == 0){
    res.send({code: 404, message: "Data not Found"})
  }
  else{
    res.send({code: 500, message: "Internal Server Error"})
  }
}

// Update
module.exports.editProduct = async (req, res) => {
  console.log(req.body, "31");

  if(req.permissions.indexOf('edit-product') === -1){
    return res.send({code: 401, message: "Unauthenticated"})
  }
  
  let newData = {}
  
  if (req.body.name){
    newData["name"] = req.body.name
  }
  if (req.body.url){
    newData["url"] = req.body.url
  }
  if (req.body.category){
    newData["category"] = req.body.category
  }
  if (req.body.seller){
    newData["seller"] = req.body.seller
  }
  if (req.body.price){
    newData["price"] = req.body.price
  }
  
  const id = req.body.id
  let filter = {_id: id}

  let doc = await productModel.findOneAndUpdate(filter, newData, {new: true});
  if (doc){
    res.send({code: 200, message: "Product Updated Successfully", data: doc})
  }
  else{
    res.send({code: 500, message: "Error Occured"})
  }
}

// Get Single Data by Id
module.exports.getProductById = async (req, res) => {

  if(req.permissions.indexOf('view-product') === -1){
    return res.send({code: 401, message: "Unauthenticated"})
  }
  
  let data = await productModel.findById(req.params.id)
  if (data) {
    res.status(200).send({message: "Fetch Data by Id Successfully", data: data})
  }
  else{
    res.status(500).send({message: "Data not fetched by Id"})
  }
}

// Delete Products
module.exports.deleteProducts = async (req, res) => {

  if(req.permissions.indexOf('delete-products') === -1){
    return res.send({code: 401, message: "Unauthenticated"})
  }

  const ids = req.body;
  const response = await productModel.deleteMany({_id:{$in:ids}})
  if (response){
    res.send({code: 200, message: "Product Deleted Successfully.", data: response})
  }
  else{
    res.send({code: 500, message: "Product Not Deleted"})
  }
  
}