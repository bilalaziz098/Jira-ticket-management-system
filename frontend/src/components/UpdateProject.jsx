import React, { useState } from "react";
import "./UpdateModal.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProject } from "../features/projects/projectSlice";

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

  console.log(projectData.projectTeam);
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
    setIsModalOpen(false);

    // dispatch(updateProject({ toUpdatedProject: [updatedProject] }));
  };

  const handleDel = (index) => {
    setProjectTeam(projectTeam.filter((_, i) => i !== index));
  };

  const updateProjectName = () => {
    setEditProjectName((prev) => !prev);
  };
  const updateTeamMembers = () => {
    setEditTeamMembers((prev) => !prev);
  };

  return (
    <>
      <div className="modal3">
        <div className="modalContainer3">
          <IoMdClose className="cross" onClick={handleSave} />
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
                  <h3>{projectName}</h3>
                  <button onClick={updateProjectName} className="editBtn">
                    Edit
                  </button>
                </>
              ) : (
                <>
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
          </div>
          {editTeamMembers ? (
            <>
              <h3>{projectTeam}</h3>
              <button onClick={updateTeamMembers} className="editBtn">
                Edit
              </button>
            </>
          ) : (
            <>
              <select name="issue" onChange={(e) => addmembers(e)}>
                <option>Select Team</option>
                {registeredUsers.map((user, index) => (
                  <option key={index}>
                    {user.user} - {user.teamRole}
                  </option>
                ))}
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
