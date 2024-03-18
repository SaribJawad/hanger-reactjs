import "./LandingPage.css";
import banner from "../../assets/cover.jpg";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="banner">
        <img src={banner} alt="" />
      </div>
    </div>
  );
}

export default LandingPage;
