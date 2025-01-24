import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./Projects.css";
import ProjectModal from "./ProjectModal";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateProject from "./UpdateProject";

function Projects() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const [showSide, setShowSide] = useState(true);
  const [updateProjectId, setUpdateProjectId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);

  const createProject = () => {
    user.user.role === "Admin" ? setIsModalOpen(true) : setIsModal2Open(true);
    // setIsModalOpen(true);
  };

  const userProjects = projects.filter((project) =>
    project.projectTeam.includes(`${user.user.name} - ${user.user.role}`)
  );

  const handleProjectTickets = (projectId) => {
    navigate(`/home/${projectId}`);
  };
  const handleProjectUpdate = (projectId) => {
    user.user.role === "Admin" ? setIsModal3Open(true) : setIsModal2Open(true);
    setUpdateProjectId(projectId);
  };

  return (
    <>
      <Nav setShowSide={setShowSide} showSide={showSide} />
      <div className="container">
        <div className={`content ${showSide ? "shift-left" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3>Projects</h3>
            {user.user.role === "Admin" ? (
              <button className="createBtn" onClick={createProject}>
                Create
              </button>
            ) : null}
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
                {userProjects.map((project, index) => (
                  <tr key={index}>
                    <td>{project.project_id}</td>
                    <td>{project.project_name}</td>
                    <td>
                      {project.projectTeam.map((team, index) => (
                        <p key={index}>{team}</p>
                      ))}
                    </td>
                    <td>
                      {user.user.role === "Admin" ? (
                        <button
                          className="projectUpdateBtn"
                          onClick={() =>
                            handleProjectUpdate(project.project_id)
                          }
                        >
                          Update Project
                        </button>
                      ) : null}

                      <button
                        className="viewTicketsBtn"
                        onClick={() => handleProjectTickets(project.project_id)}
                      >
                        View Tickets
                      </button>
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
                  <p>Sign in as Admin to perform this action</p>
                </div>
              </div>
            </div>
          )}
          {isModalOpen && <ProjectModal setIsModalOpen={setIsModalOpen} />}
          {isModal3Open && (
            <UpdateProject
              setIsModalOpen={setIsModal3Open}
              updateProjectId={updateProjectId}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;
