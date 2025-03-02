import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Frontend/context/Cartcontext";
import Navbar from "./Frontend/components/navbar";
import Footer from "./Frontend/components/footer";
import Home from "./Frontend/pages/Home";
import ProductDetail from "./Frontend/pages/ProductDetal";
import Cart from "./Frontend/pages/Cart";
import Checkout from "./Frontend/pages/Checkout";
import Login from "./Frontend/pages/Login";
import Register from "./Frontend/pages/Register";
import OrderHistory from "./Frontend/pages/OrderHistory";
import SearchPage from "./Frontend/pages/SeacrchPage";
import ProfilePage from "./Frontend/pages/ProfilePage";

import AdminPage from "./AdminPage";

function App1() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />

            {/* Route mới */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App1;
