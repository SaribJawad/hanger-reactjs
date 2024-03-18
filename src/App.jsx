import HomePage from "./pages/homePage/HomePage";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Category from "./pages/category/Category";
import Footer from "./components/footer/Footer";
import ProductDetail from "./pages/productDetail/ProductDetail";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
