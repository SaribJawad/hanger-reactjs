import LandingPage from "../../components/landingPage/LandingPage";
import CatSections from "../../components/catSections/CatSections";
import "./HomePage.css";
import About from "../../components/about/About";

function HomePage() {
  return (
    <div className="home-page">
      <LandingPage />
      <CatSections />
      <About />
    </div>
  );
}

export default HomePage;
