import React from "react";
import { GoProjectRoadmap } from "react-icons/go";
import { CiViewTable } from "react-icons/ci";
import { FaCode } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiFillFileAdd } from "react-icons/ai";
import { IoIosSettings, IoIosLogOut } from "react-icons/io";
import "./SideNav.css";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SideNav({ showSide }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const openBoard = () => {
    navigate("/home");
  };
  return (
    <>
      <div className={showSide ? "sidenav active" : "sidenav"}>
        <div>
          <ul className="sidebarNav">
            <li>
              <GoProjectRoadmap className="icons2" />
              <a href="">Roadmap</a>
            </li>
            <li onClick={openBoard}>
              <CiViewTable className="icons2" />
              <a href="">Board</a>
            </li>
            <li>
              <FaCode className="icons2" />
              <a href="">Code</a>
            </li>
            <li>
              <IoDocumentTextOutline className="icons2" />
              <a href="">Project pages</a>
            </li>
            <li>
              <AiFillFileAdd className="icons2" />
              <a href="">Add shortcut</a>
            </li>
            <li>
              <IoIosSettings className="icons2" />
              <a href="">Project settings</a>
            </li>
          </ul>
        </div>
        <div className="logout">
          <li onClick={handleLogout}>
            <IoIosLogOut className="icons2" />
            <a href="">Logout</a>
          </li>
        </div>
      </div>
    </>
  );
}

export default SideNav;
