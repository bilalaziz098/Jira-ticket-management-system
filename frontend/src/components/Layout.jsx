import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      {!isAuthenticated ? <Link to="/"></Link> : <Link to="/projects"></Link>}
      git name
      <Outlet />
    </>
  );
};

export default Layout;
