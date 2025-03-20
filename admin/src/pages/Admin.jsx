import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "../component/ProductList";
import AddProduct from "../component/AddProduct";
import CustomerList from "../component/CustomerList";
import AddCustomer from "../component/AddCustomer";
import ProviderList from "../component/ProviderList";
import AddProvider from "../component/AddProvider";
import PurchaseDetailList from "../component/PurchaseDetailList";
import AddPurchaseDetail from "../component/AddPurchaseDetail";
import CustomerDetail from "../component/CustomerDetail";
import SignUp from "../component/Signup";
import Login from "../component/Login";

const Admin = () => {
  return (
    <div>
      <Routes>
        {/* Mặc định hiển thị ProductList */}
        <Route index element={<ProductList />} />

        {/* Product Routes */}
        <Route path="/DanhSachSanPham" element={<ProductList />} />
        <Route path="/ThemSanPham" element={<AddProduct />} />
        <Route path="/CapNhatSanPham" element={<AddProduct />} />

        {/* Customer Routes */}
        <Route path="/DanhSachKhachHang" element={<CustomerList />} />
        <Route path="/ThemKhachHang" element={<AddCustomer />} />
        <Route path="/CapNhatKhachHang" element={<AddCustomer />} />
        <Route path="/ThongTinKhachHang" element={<CustomerDetail />} />

        {/* Provider Routes */}
        <Route path="/NhaCungCap" element={<ProviderList />} />
        <Route path="/ThemNhaCungCap" element={<AddProvider />} />
        <Route path="/CapNhatNhaCungCap" element={<AddProvider />} />

        {/* Purchase Detail Routes */}
        <Route path="/NhapHang" element={<PurchaseDetailList />} />
        <Route path="/ThemNhapHang" element={<AddPurchaseDetail />} />
        <Route path="/CapNhatNhapHang" element={<AddPurchaseDetail />} />

        <Route path="/Dangky" element={<SignUp />} />
        <Route path="/DangNhap" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Admin;
