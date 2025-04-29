import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./component/Header";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product_detail from "./pages/Product_details";
import ShoppingCart from "./pages/ShoppingCart";
import { useEffect } from "react";
import OrderHistory from './pages/OrderHistory';

function App() {
  useEffect(() => {
    const loginTime = parseInt(localStorage.getItem("loginTime"), 10);
    const now = Date.now();
    //       Đổi giờ -> phút -> giây -> mili giây
    const maxAge = 3 * 60 * 60 * 1000; // 3 tiếng

    if (loginTime && now - loginTime > maxAge) {
      localStorage.clear();
      console.log("Phiên đăng nhập đã hết hạn, yêu cầu đăng nhập lại.");
    }
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/products/:productId" element={<Product_detail />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
