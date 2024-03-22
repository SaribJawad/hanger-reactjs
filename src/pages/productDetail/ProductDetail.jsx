import { useAppContext } from "../../context/Context";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoIosStar } from "react-icons/io";
import { TbRulerMeasure } from "react-icons/tb";
import { useEffect } from "react";

function ProductDetail() {
  const { categoryName, productId } = useParams();
  const {
    getProduct,
    prev,
    next,
    imageContainerRef,
    dispatch,
    addToCart,
    isInCart,
    cartItems,
    itemQuantity,
    formatter,
  } = useAppContext();

  const product = getProduct(categoryName, productId);

  useEffect(
    function () {
      dispatch({
        type: "toggleCatButton",
        payload: cartItems?.some((item) => item.id === product?.id),
      });
    },
    [dispatch, cartItems, product]
  );

  return (
    <div className="product-view-container">
      <div className="product-view">
        <div className="product-left">
          <div className="product-image">
            <div className="prev" onClick={prev}>
              <GrFormPrevious size={30} />
            </div>
            <div className="slide-panel" ref={imageContainerRef}>
              {product?.images.map((img, index) => (
                <img src={img} key={index} />
              ))}
            </div>
            <div className="next" onClick={next}>
              <MdNavigateNext size={30} />
            </div>
          </div>
          {/* <div className="product-image-thumb">image thumb</div> */}
        </div>
        <div className="product-right">
          <h2>{product?.name}</h2>
          <div className="rating">
            <div>
              {new Array(5).fill().map((star, index) => (
                <IoIosStar key={index} className="star-icon" />
              ))}
            </div>
            <span>{product?.reviews} reviews</span>
          </div>
          <div className="price">
            <p>{formatter.format(product?.price)}</p>
          </div>
          <p className="size-chart-title">
            <TbRulerMeasure />
            Size chart
          </p>
          <div className="size-chart">
            <p>
              Size: <span>LARGE</span>
            </p>
            <select>
              <option value="xsmall">XSmall</option>
              <option value="small">Small</option>
              <option value="Medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="quantity">
            <p>Quanity</p>
            <input
              type="number"
              value={itemQuantity}
              min={1}
              onChange={(e) =>
                dispatch({ type: "itemQuantity", payload: e.target.value })
              }
            />
          </div>
          <button onClick={() => addToCart(product)}>
            {isInCart ? "Added to the cart" : "Add to cart"}
          </button>
          <div className="product-description">
            <h3>Product description:</h3>
            <p>{product?.productDescription}</p>
          </div>
          <p className="production-country">Country of production: Pakistan</p>
          <p className="wash-care">
            Wash care: Machine wash Cold with similar Colors. Only Non-chlorine
            bleach if needed. Dry in a dryer (recommended) & Iron If needed!
          </p>
          <div className="catalog">
            <p>Catalog :</p>
            <Link to={`/category/${categoryName}`}>
              <span>{categoryName}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
