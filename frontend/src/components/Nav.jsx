import React, { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FaJira, FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { TbBellRinging2Filled } from "react-icons/tb";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import SideNav from "./SideNav";

function Nav({ setShowSide, showSide }) {
  const [selectedLink, setSelectedLink] = useState(null);
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <>
      <nav className="loginNav">
        <div className="links">
          <CgMenuGridO
            className="icons"
            onClick={() => setShowSide((prev) => !prev)}
          />
          <FaJira style={{ color: "rgb(61, 110, 205)", fontSize: "21px" }} />
          <h3>Jira Software clone</h3>
          <li>
            <a
              href="#"
              className={selectedLink === "yourwork" ? "active" : ""}
              onClick={() => handleLinkClick("yourwork")}
            >
              Your work
            </a>
          </li>
          <li>
            <a
              href="#"
              className={selectedLink === "projects" ? "active" : ""}
              onClick={() => handleLinkClick("projects")}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#"
              className={selectedLink === "filters" ? "active" : ""}
              onClick={() => handleLinkClick("filters")}
            >
              Filters
            </a>
          </li>
          <li>
            <a
              href="#"
              className={selectedLink === "dashboard" ? "active" : ""}
              onClick={() => handleLinkClick("dashboard")}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className={selectedLink === "people" ? "active" : ""}
              onClick={() => handleLinkClick("people")}
            >
              People
            </a>
          </li>
          <li>
            <a
              href="#"
              className={selectedLink === "apps" ? "active" : ""}
              onClick={() => handleLinkClick("apps")}
            >
              Apps
            </a>
          </li>
          <button>Create</button>
        </div>
        <div className="links">
          <CiSearch className="icons" />
          <input type="search" placeholder="Search" />
          <TbBellRinging2Filled className="icons" />
          <BsFillQuestionCircleFill className="icons" />
          <IoIosSettings className="icons" />
          <FaUserCircle className="icons" />
        </div>
      </nav>
      <div className="breaker"></div>
      <SideNav showSide={showSide} />
    </>
  );
}

export default Nav;
