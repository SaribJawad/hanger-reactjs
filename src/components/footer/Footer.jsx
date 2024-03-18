import "./Footer.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

function Footer() {
  return (
    <footer>
      <div className="footer-header">
        <h3>Follow-us on social media!</h3>
        <div className="footer-header-icons">
          <FaFacebook className="icon" />
          <FaInstagram className="icon" />
        </div>
      </div>
      <hr />
      <div className="footer-mid">
        <div className="about-us">
          <h3>About Us</h3>
          <p>
            A Streetwear Clothing store providing with the best fashion and
            quality, Inspired by street fashion. Affordable and qualitative.
          </p>
          <p className="flex-div">
            <MdOutlineMailOutline />
            thehangerrpk@gmail.com
          </p>
          <p className="flex-div">
            <FiPhone />
            03460217098
          </p>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <div className="links">
            <p>Search</p>
            <p>FAQ'S</p>
            <p>Exchange & Returns</p>
            <p>Shipping Policy</p>
            <p>Contact</p>
          </div>
        </div>
        <div className="news-letter">
          <h3>Subscribe to our newsletter</h3>
          <p>Get the latest trends & discounts first.</p>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Your email" />

          <div className="check-box">
            <input type="checkbox" />
            <span>Email me with news and offers</span>
          </div>
          <button>Subscribe</button>
        </div>
      </div>
      <hr />
      <div className="copyright">
        <p>
          Copyright © 2024 <span> hangerpakistan</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
