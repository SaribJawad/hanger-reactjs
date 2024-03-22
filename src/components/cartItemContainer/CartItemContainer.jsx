import "./CartItemContainer.css";
import { useAppContext } from "../../context/Context";
import { IoClose } from "react-icons/io5";

function CartItemContainer() {
  const { cartItems, removeFromCart, checkoutPrice, formatter } =
    useAppContext();

  return (
    <div className="cart-item-container">
      <div className="cart-item-box">
        <div className="cart-item-right-box">
          {cartItems.map((item, index) => {
            const totalSingleItemPrice = item?.price * item?.itemQuantity;
            return (
              <div className="cart-item-display" key={index}>
                <div className="cart-item-detail">
                  <img src={item.images[0]} alt="" />
                  <div className="cart-item-name">
                    <h4>{item.name}</h4>
                    <p>quanity : {item.itemQuantity}</p>
                  </div>
                </div>
                <div className="price">
                  <IoClose onClick={() => removeFromCart(item.id)} />

                  <p>{formatter.format(totalSingleItemPrice)}</p>
                </div>
              </div>
            );
          })}

          <div className="cart-item-instructions">
            <p>Special instructions for seller</p>
            <textarea cols="30" rows="10"></textarea>
          </div>
        </div>
        <div className="cart-item-left-box">
          <div className="sub-total">
            <p>Subtotal</p>
            <p>{formatter.format(checkoutPrice)}</p>
          </div>
          <hr />
          <div className="checkout-btn">
            <p>Taxes and shipping calculated at checkout</p>
            <button>Checkout - {formatter.format(checkoutPrice)}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemContainer;
