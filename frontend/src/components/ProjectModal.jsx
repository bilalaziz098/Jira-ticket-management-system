import React, { useState } from "react";
import "./ProjectModal.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addProjects } from "../features/projects/projectSlice";

function ProjectModal({ setIsModalOpen }) {
  const { user, registeredUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [projectTeam, setProjectTeam] = useState([]);

  const addmembers = (e) => {
    const selectedMember = e.target.value;
    if (selectedMember && !projectTeam.includes(selectedMember)) {
      setProjectTeam([...projectTeam, selectedMember]);
    }
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
              {registeredUsers.map((user, index) => (
                <option key={index}>
                  {user.user} - {user.teamRole}
                </option>
              ))}
            </select>

            <div className="team">
              {projectTeam.length > 0 &&
                projectTeam.map((member, index) => (
                  <div key={index} className="selectedMember">
                    {member}
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
