import { Routes, Route } from "react-router";
// Authentification :
import SignUp from "./authentification/SignUp";
import SignIn from "./authentification/SignIn";
// Customer :
import CustomerHome from "./customer/home/CustomerHome";
import FilterProducts from "./customer/products/allProducts/FilterProducts";
import ProductDetails from "./customer/products/productPage/ProductDetails";
// Vendor :
import CreateProduct from "./vendor/products/cuProduct/CreateProduct";
import MyFavorites from "./customer/favorites/MyFavorites";
import ReadMore from "./customer/readmore/ReadMore";

import Dashboard from "./vendor/dashboard/Dashboard";
import UpdateProduct from "./vendor/products/cuProduct/UpdateProduct";
import NotFound from "./globalElements/NotFound";

function App() {
  return (
    <Routes>
      {/* Authentification : */}
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      {/* Customer : */}
      <Route path="/home" element={<CustomerHome />} />
      <Route path="/readmore" element={<ReadMore />} />
      <Route path="/products" element={<FilterProducts />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/myfavorites" element={<MyFavorites />} />
      {/* Vendor : */}
      <Route path="/createproduct" element={<CreateProduct />} />
      <Route path="/update/:id" element={<UpdateProduct/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>

      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
