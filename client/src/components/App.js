import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import ItemDetail from "./ItemDetail";
import Cart from "./Cart";
import GlobalStyles from "./GlobalStyles";
import AboutUs from "./AboutUs";
import Checkout from "./Checkout.js";
import Payment from "./Payment";
//Main app component that defined all of the routes, as well as the header
const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/itemDetail/:itemId" element={<ItemDetail />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
