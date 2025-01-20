import React, { useState } from "react";
import Nav from "./Nav";
import "./Projects.css";
import ProjectModal from "./ProjectModal";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

function Projects() {
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const [showSide, setShowSide] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const createProject = () => {
    user.user.role === "Admin" ? setIsModalOpen(true) : setIsModal2Open(true);
    // setIsModalOpen(true);
  };

  return (
    <>
      <Nav setShowSide={setShowSide} showSide={showSide} />
      <div className="container">
        <div className={`content ${showSide ? "shift-left" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3>Projects</h3>
            <button className="createBtn" onClick={createProject}>
              Create
            </button>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Project ID</th>
                  <th style={{ width: "30%" }}>Project Name</th>
                  <th>Project Team</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>{project.project_id}</td>
                    <td>{project.project_name}</td>
                    <td>
                      {project.projectTeam.map((team, index) => (
                        <p key={index}>{team}</p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModal2Open && (
            <div className="modal2">
              <div className="modalContainer2">
                <IoMdClose
                  className="cross"
                  onClick={() => setIsModal2Open(false)}
                />

                <div className="title2">
                  <p>Sign in as Admin to create a project</p>
                </div>
              </div>
            </div>
          )}
          {isModalOpen && <ProjectModal setIsModalOpen={setIsModalOpen} />}
        </div>
      </div>
    </>
  );
}

export default Projects;
