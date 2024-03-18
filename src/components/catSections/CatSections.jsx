import "./CatSections.css";
import { useAppContext } from "../../context/Context";
import { Link } from "react-router-dom";

function CatSections() {
  const { data } = useAppContext();

  const categories = Object.entries(data);

  return (
    <div className="cart-section">
      <div className="cart-container">
        {categories.map(([cat, catData], index) => {
          const imageUrl = catData[0].images[0];

          return (
            <Link to={`/category/${cat}`} className="cat-box" key={index}>
              <div className="cat-box-image">
                <img src={imageUrl} alt="" />
              </div>
              <div className="cat-button">
                <h3>{cat}</h3>
                <button>Shop Now</button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CatSections;
