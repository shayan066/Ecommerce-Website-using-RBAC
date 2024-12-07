import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import AddProduct from "./components/AddProduct"
import GetProduct from "./components/GetProduct"
import GetProductById from "./components/GetProductById"
import Signup from "./components/Signup"
import UserCart from "./components/UserCart"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/add/products" element={<AddProduct/>}/>
      <Route path="/get/products" element={<GetProduct/>}/>
      <Route path="/get/product/:id" element={<GetProductById/>}/>
      <Route path="/get/cart" element={<UserCart/>}/>
    </Routes>
    </>
  )
}

export default App
