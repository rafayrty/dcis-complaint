import { Outlet, Link } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
