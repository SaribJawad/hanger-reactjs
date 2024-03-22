import { Link } from "react-router-dom";
import "./CartEmpty.css";

function CartEmpty() {
  return (
    <div className="empty-cart-container">
      <div className="empty-cart-btn">
        <p>Your cart is currently empty</p>
        <Link to={"/"}>
          <button>Continue browsing</button>
        </Link>
      </div>
    </div>
  );
}

export default CartEmpty;
