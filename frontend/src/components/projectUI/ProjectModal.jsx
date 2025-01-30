import React, { useState } from "react";
import "../.././styles/ProjectModal.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addProjects } from "../../store/features/projects/projectSlice";

function ProjectModal({ setIsModalOpen }) {
  const { user, registeredUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [projectTeam, setProjectTeam] = useState([
    `${user.user.name} - ${user.user.role}`,
  ]);

  const addmembers = (e) => {
    const selectedMember = e.target.value;
    if (selectedMember && !projectTeam.includes(selectedMember)) {
      setProjectTeam([...projectTeam, selectedMember]);
    }
  };

  const handleDel = (index) => {
    setProjectTeam(projectTeam.filter((_, i) => i !== index));
  };

  const projectData = {
    project_name: projectName,
    projectTeam,
  };
  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/projects", {
        project_name: projectName,
      });
      const Res = response.data.project.project_id;
      const data = { ...projectData, project_id: Res };
      dispatch(addProjects(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <div className="modal">
        <div className="modalContainer">
          <div className="title">
            <p>Create Project </p>
          </div>
          <form className="projectForm" action="" onSubmit={submitForm}>
            <input
              type="text"
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter Project name"
            />
            <label className="label projectTeam">Project Team</label>
            <select
              name="issue"
              value={"Select team"}
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

            <div className="team">
              {projectTeam.length > 0 &&
                projectTeam.map((member, index) => (
                  <div key={index} className="selectedMember">
                    {member}
                    {member !== `${user.user.name} - ${user.user.role}` ? (
                      <IoMdClose
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => handleDel(index)}
                      />
                    ) : null}
                  </div>
                ))}
            </div>

            <div className="modalend">
              <button className="create">Create</button>
              <p className="cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProjectModal;
