import { Outlet, Link } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import React from "react";
const Layout = () => {
  return (
    <>
      <div className="layout flex flex-col justify-between">
        <Toaster />
        <header>
          <NavBar />
        </header>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
