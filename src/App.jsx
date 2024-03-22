import HomePage from "./pages/homePage/HomePage";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Category from "./pages/category/Category";
import Footer from "./components/footer/Footer";
import ProductDetail from "./pages/productDetail/ProductDetail";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="category/:name" element={<Category />} />
        <Route
          path="category/:categoryName/:productId"
          element={<ProductDetail />}
        />
        <Route path="cart" element={<Cart />} />
      </Routes>
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
