import { useAppContext } from "../../context/Context";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoIosStar } from "react-icons/io";
import { TbRulerMeasure } from "react-icons/tb";

import { useRef } from "react";

function ProductDetail() {
  const { categoryName, productId } = useParams();
  const { getProduct } = useAppContext();

  let imageContainerRef = useRef(null);

  function prev() {
    imageContainerRef.current.scrollLeft -= 500;
  }

  function next() {
    imageContainerRef.current.scrollLeft += 500;
  }

  const product = getProduct(categoryName, productId);
  console.log(product);
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
              {" "}
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
            <p>Rs.{product?.price}.00</p>
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
            <input type="number" defaultValue={1} min={1} />
          </div>
          <button>Add to cart</button>
          <div className="product-description">
            <p>Product description</p>
            <p>{product?.productDescription}</p>
          </div>
          <p>Country of production: Pakistan</p>
          <p>
            Wash care: Machine wash Cold with similar Colors.Only Non-chlorine
            bleach if needed. Dry in a dryer (recommended) & Iron If needed!
          </p>
          <div className="catalog">
            <p>
              Catalog{" "}
              <Link to={`/category/${categoryName}`}>
                <span>{categoryName}</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
