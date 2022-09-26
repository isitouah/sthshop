import React from 'react'
import Home from "./Home"
import Productinfo from "./Productinfo"
import Product from "./ProductList"
import Cart from "./Cart"
import Login from "./Login"
import Register from "./Register"
import { ifUserLogged } from "../Users.js";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

  
const App = () => {

  return ( 
    <BrowserRouter>
    <Routes>      
      <Route path="*" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/Productinfo/:id" element={<Productinfo />} />
      <Route path='/Product' element={ifUserLogged()?<Product/>:<Login/>}  /> 
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App