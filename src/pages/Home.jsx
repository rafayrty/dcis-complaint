import Complaints from "../components/Complaints";
import CTA from "../components/CTA";
const Home = () => {
  return (
    <div className="Home">
      <CTA />
      <div className="main-content container-width">
        <Complaints />
      </div>
    </div>
  );
};

export default Home;
