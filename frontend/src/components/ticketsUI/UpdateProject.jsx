import React, { useState } from "react";
import "../.././styles/UpdateModal.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProject } from "../../store/features/projects/projectSlice";

function UpdateProject({ setIsModalOpen, updateProjectId }) {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { registeredUsers } = useSelector((state) => state.auth);
  const [editProjectName, setEditProjectName] = useState(true);
  const [editTeamMembers, setEditTeamMembers] = useState(true);

  const projectData = projects.find(
    (project) => project.project_id === updateProjectId
  );

  const [projectName, setProjectName] = useState(projectData.project_name);
  const [projectTeam, setProjectTeam] = useState(projectData.projectTeam);

  const addmembers = (e) => {
    const selectedMember = e.target.value;
    if (selectedMember && !projectTeam.includes(selectedMember)) {
      setProjectTeam([...projectTeam, selectedMember]);
    }
  };
  const handleSave = async () => {
    const updatedProject = {
      ...projectData,
      project_name: projectName,
      projectTeam: projectTeam,
    };

    try {
      const response = await axios.patch(
        `http://localhost:3000/projects/${projectData.project_id}`,
        updatedProject
      );

      if (response.status === 200) {
        dispatch(updateProject({ toUpdatedProject: [updatedProject] }));
      }
    } catch (error) {
      console.error("Error updating issue:", error);
    }

    // dispatch(updateProject({ toUpdatedProject: [updatedProject] }));
  };

  const handleDel = (index) => {
    setProjectTeam(projectTeam.filter((_, i) => i !== index));
  };

  const updateProjectName = () => {
    handleSave();
    setEditProjectName((prev) => !prev);
  };
  const updateTeamMembers = () => {
    handleSave();
    setEditTeamMembers((prev) => !prev);
  };

  return (
    <>
      <div className="modal3">
        <div className="modalContainer3">
          <IoMdClose className="cross" onClick={() => setIsModalOpen(false)} />
          <div>
            <div
              className="titleDivs"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {editProjectName ? (
                <>
                  <p style={{ margin: "0px", color: "teal", fontSize: "20px" }}>
                    Project Name -{" "}
                  </p>
                  <h3>{projectName}</h3>
                  <button onClick={updateProjectName} className="editBtn">
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <p style={{ margin: "0px", color: "teal", fontSize: "20px" }}>
                    Project Name -{" "}
                  </p>
                  <input
                    className="editTitle"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  <button onClick={updateProjectName} className="btnSave">
                    Save
                  </button>
                </>
              )}
            </div>
            <div
              style={{
                border: "1px solid lightgrey",
                width: "50%",
                margin: "15px auto",
              }}
            ></div>
          </div>
          {editTeamMembers ? (
            <>
              <p style={{ margin: "0px", color: "teal", fontSize: "20px" }}>
                Project Team
              </p>
              {projectTeam.map((team, i) => (
                <h3 key={i} style={{ margin: "5px 0px" }}>
                  {team}
                </h3>
              ))}
              <button
                onClick={updateTeamMembers}
                style={{ marginTop: "10px" }}
                className="editBtn"
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <p style={{ margin: "0px", color: "teal", fontSize: "20px" }}>
                Project Team
              </p>
              <select
                style={{ marginTop: "5px" }}
                name="issue"
                onChange={(e) => addmembers(e)}
              >
                <option>Select Team</option>
                {registeredUsers.map((user, index) =>
                  projectTeam.includes(
                    `${user.user} - ${user.teamRole}`
                  ) ? null : (
                    <option key={index}>
                      {user.user} - {user.teamRole}
                    </option>
                  )
                )}
              </select>
              <div className="">
                {projectTeam.length > 0 &&
                  projectTeam.map((member, index) => (
                    <div key={index} className="selectedMembers">
                      {member}
                      <IoMdClose
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => handleDel(index)}
                      />
                    </div>
                  ))}
              </div>
              <button onClick={updateTeamMembers} className="btnSave">
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateProject;
