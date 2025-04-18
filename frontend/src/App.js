import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Header from './component/Header';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Category from './pages/Category';
import Product_detail from './pages/Product_details';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category' element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/products/:productId" element={<Product_detail />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
