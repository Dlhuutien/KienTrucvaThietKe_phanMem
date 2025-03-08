import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "../component/ProductList";
import AddProduct from "../component/AddProduct";
import SignUp from "../component/Signup";
import Login from "../component/Login";

const Admin = () => {
  return (
    <div>
      <Routes>
        {/* Product Routes */}
        <Route path="/DanhSachSanPham" element={<ProductList />} />
        <Route path="/ThemSanPham" element={<AddProduct />} />
        <Route path="/CapNhatSanPham" element={<AddProduct />} />

        <Route path="/Dangky" element={<SignUp />} />
        <Route path="/DangNhap" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Admin;
