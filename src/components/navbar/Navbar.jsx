import "./Navbar.css";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { useAppContext } from "../../context/Context";
import { Link } from "react-router-dom";

function Navbar() {
  const { clicked, handleClick } = useAppContext();

  const { data } = useAppContext();

  const categories = Object.keys(data);
  return (
    <nav>
      <div id="mobile" onClick={handleClick}>
        {clicked ? (
          <IoCloseOutline className="close" />
        ) : (
          <RxHamburgerMenu className="hamburger" />
        )}
      </div>

      <Link to="/">
        <img
          src="https://thehangerpakistan.com/cdn/shop/files/2380C13E-2290-4BB6-8502-3AA828E8FBE0_60x.png?v=1696434817"
          alt=""
        />
      </Link>

      <div className={clicked ? "links active" : "links"}>
        <Link to="./">
          <h3>Home</h3>
        </Link>
        {categories.map((name, index) => {
          return (
            <Link to={`./category/${name}`} key={index} onClick={handleClick}>
              <h3>{name}</h3>
            </Link>
          );
        })}
      </div>
      <div className="cart-button">
        <IoCartOutline className="cart-icon" />
        <span className="no-of-cart">0</span>
      </div>
    </nav>
  );
}

export default Navbar;
