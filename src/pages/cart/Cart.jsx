import CartEmpty from "../../components/cartEmpty/CartEmpty";
import CartItemContainer from "../../components/cartItemContainer/CartItemContainer";
import { useAppContext } from "../../context/Context";
import "./Cart.css";

function Cart() {
  const { cartItems } = useAppContext();

  return (
    <div className="cart-items-container">
      <h1>Your cart</h1>
      {cartItems.length === 0 ? <CartEmpty /> : <CartItemContainer />}
    </div>
  );
}

export default Cart;
