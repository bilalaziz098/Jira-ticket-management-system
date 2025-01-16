import React, { useEffect } from "react";
import Login from "../components/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return <div>{!isAuthenticated ? <Login /> : null}</div>;
}

export default Authentication;
