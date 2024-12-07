const express = require ('express');
const cors = require("cors");
const productController = require('./controllers/ProductController')
const bodyParser = require('body-parser')
const userController = require('./controllers/UserController')
const rolesController = require('./controllers/RoleController')
const paymentController = require('./controllers/PaymentController')
const auth  = require('./middleware/auth')

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())
const db = require('./db');


app.post('/add-product', auth.checkToken, productController.addProduct)
app.get('/get-products', auth.checkToken, productController.getProduct)
app.post('/edit-products', auth.checkToken, productController.editProduct)
app.get('/get-product/:id', auth.checkToken, productController.getProductById)
app.post('/delete-products', auth.checkToken, productController.deleteProducts)

app.post('/signup', userController.signup)
app.post('/login', userController.login)
app.post('/addToCart', auth.checkToken, userController.addToCart)
app.post('/getCart', auth.checkToken, userController.getCart)

app.post('/addRole', auth.checkToken, rolesController.addRole)
app.post('/deleteRole', auth.checkToken, rolesController.deleteRole)

app.post('/orders', paymentController.orders)
app.post('/verify', paymentController.verify)





const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
