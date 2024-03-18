import { Link, useParams } from "react-router-dom";
import "./Category.css";
import { IoIosStar } from "react-icons/io";
import { useAppContext } from "../../context/Context";
import { MdSort } from "react-icons/md";

function Category() {
  const { name } = useParams();
  const { data, handleSort } = useAppContext();
  const categoryItems = data[name] || [];

  function getImage() {
    switch (name.toLocaleLowerCase()) {
      case "bottoms":
        return "https://thehangerpakistan.com/cdn/shop/files/8D6D8A09-83BD-4666-89AD-BE222B705B3F_720x900.jpg?v=1702839346";
      case "headwear":
        return "https://thehangerpakistan.com/cdn/shop/products/image_a07e8a80-12be-4251-91ad-5799f60421ac_720x720.jpg?v=1681356105";
      case "hoodies":
        return "https://thehangerpakistan.com/cdn/shop/files/4BE86E59-40F3-4EAB-9493-4917B2C1F9F4_720x900.jpg?v=1702912946";
      case "outerwear":
        return "https://thehangerpakistan.com/cdn/shop/files/34A49E0A-F08B-44B6-997D-5D2CFAF18446_720x720.jpg?v=1704366592";
      case "pink":
        return "https://thehangerpakistan.com/cdn/shop/files/6627BC79-AA20-4F24-BEA8-5717A4EB18D5_720x900.jpg?v=1703557981";
      case "t-shirts":
        return "https://thehangerpakistan.com/cdn/shop/files/3F900577-EB75-4093-9B3F-658A66F29886_720x1080.jpg?v=1696426544";
      default:
        throw new Error("Image not found");
    }
  }

  return (
    <div className="cat-container">
      <div className="category-banner">
        <img src={getImage(name)} alt="" />
        <span>{name}.</span>
      </div>
      <div className="sort-input">
        <MdSort />
        Sort by
        <select className="select-btn" onChange={(e) => handleSort(e)}>
          <option value="none" disabled hidden></option>
          <option value="A-Z">Alphabetically, A-Z</option>
          <option value="Z-A">Alphabetically, Z-A</option>
          <option value="low to high">Price, low to high</option>
          <option value="high to low">Price, high to low</option>
        </select>
      </div>
      <div className="category-card-container">
        {categoryItems.map((item, index) => (
          <Link key={index} to={`/category/${name}/${item.id}`}>
            <div className="category-card">
              <div className="category-card-img">
                <img src={item.images[0]} alt="" />
              </div>
              <div className="category-card-desc">
                <h3 style={{ color: "#000" }}>{item.name}</h3>
                <div className="star">
                  {new Array(5).fill().map((star, index) => (
                    <IoIosStar key={index} className="star-icon" />
                  ))}

                  <span style={{ color: "#000" }}>{item.reviews} reviews</span>
                </div>
                <p>Rs.{item.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
