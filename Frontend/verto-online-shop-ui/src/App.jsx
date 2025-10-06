import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./screens/home/Home";
import Product from "./screens/product/Product";
import { AuthProvider } from "react-oauth2-code-pkce";
import { authConfig } from "./auth/authConfig";
import Order from "./screens/order/Order";
import Cart from "./screens/cart/Cart";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "./searchBar/SearchContext";
import Navbar from "./navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider authConfig={authConfig}>
        <SearchProvider>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            bodyClassName="custom-toast-body"
          />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<WithNavbar />}>
              <Route path="/product" element={<Product />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

const WithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default App;
