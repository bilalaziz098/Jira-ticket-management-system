import React, { useEffect, useState } from "react";
import "./UpdateModal.css";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {
  deleteIssue,
  setIssues,
  updateIssue,
} from "../features/issues/issueSlice";
import { reset } from "../features/auth/authSlice";
import { resetprojects } from "../features/projects/projectSlice";

function UpdateModal({ setUpdateModalOpen, updateTicket }) {
  const { projectId } = useParams();
  const { projects } = useSelector((state) => state.projects);
  const { user, registeredUsers } = useSelector((state) => state.auth);
  const [editTitle, setEditTitle] = useState(true);
  const [editDescription, setEditDescription] = useState(true);
  const Issues = useSelector((state) => state.issues.issues);
  const dispatch = useDispatch();
  const [analyst, setAnalyst] = useState(updateTicket.issue.analyst || "");
  const [assigned, setAssigned] = useState(updateTicket.issue.assignedTo || "");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const userIssue = Issues.filter((issue) => issue.user_id === user.user.id);
  const [status, setStatus] = useState(updateTicket.issue.status);
  const [title, setTitle] = useState(updateTicket.issue.title);
  const [desc, setDesc] = useState(updateTicket.issue.description);
  const data = updateTicket.issue;

  const openDetails = () => {
    setIsDetailsOpen((prev) => !prev);
  };
  const selectedProject = projects.find(
    (project) => project.project_id === Number(projectId)
  );

  // const handleDel = async (i) => {
  // dispatch(setIssues([]));
  // dispatch(resetprojects([]));
  // dispatch(reset());
  // const toDeleteIssue = Issues[i];
  // const del_id = toDeleteIssue.issue_id;
  // console.log("del id is:", del_id);
  // try {
  //   await axios.delete(`http://localhost:3000/home/${del_id}`);
  //   dispatch(deleteIssue({ issue_id: del_id }));
  // } catch (error) {
  //   console.error("Error deleting order:", error);
  // }
  //   setUpdateModalOpen(false);
  // };

  const handleSave = async () => {
    console.log("title is", title);
    const updatedIssue = {
      ...data,
      assignedTo: assigned,
      analyst,
      user_id: user.user.id,
      title: title,
      description: desc,
      status: status,
    };

    console.log(updatedIssue);
    try {
      const response = await axios.patch(
        `http://localhost:3000/home/${data.issue_id}`,
        updatedIssue
      );

      if (response.status === 200) {
        dispatch(
          updateIssue({ toUpdatedIssue: [updatedIssue], user_id: user.user.id })
        );
      }
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  useEffect(() => {
    if (assigned !== updateTicket.issue.assignedTo) {
      handleSave();
    }
  }, [assigned]);
  useEffect(() => {
    if (analyst !== updateTicket.issue.analyst) {
      handleSave();
    }
  }, [analyst]);

  const editAnalyst = (e) => {
    setAnalyst(e.target.value);
  };

  const editAssignee = (e) => {
    setAssigned(e.target.value);
  };

  const updateTitle = () => {
    handleSave();
    setEditTitle((prev) => !prev);
  };
  const updateDescription = () => {
    handleSave();
    setEditDescription((prev) => !prev);
  };

  return (
    <>
      <div className="modal1">
        <div className="modalContainer1">
          <div className="title">
            <p>Issue ID - {data.issue_id}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* <button
                className="btn"
                onClick={() => handleDel(updateTicket.index)}
              >
                Delete
              </button> */}

              <IoMdClose
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => setUpdateModalOpen(false)}
              />
            </div>
          </div>

          <div className="modalDivs">
            <div className="div1">
              <div
                className="titleDivs"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {editTitle ? (
                  <>
                    <h3>{title}</h3>
                    <button onClick={updateTitle} className="editBtn">
                      Edit
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      className="editTitle"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <button onClick={updateTitle} className="btnSave">
                      Save
                    </button>
                  </>
                )}
              </div>

              <div className="btnDiv">
                <div className="btns2">
                  <button>Add</button>
                  <button>Apps</button>
                </div>
                <div className="btns2 status">
                  <p>Task Classification - {updateTicket.issue.taskType}</p>

                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="TO DO">TO DO</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="section">
                <div className="description">
                  {editDescription ? (
                    <>
                      <div className="descDiv">
                        <h4>Description</h4>
                        <button onClick={updateDescription} className="editBtn">
                          Edit
                        </button>
                      </div>

                      <div
                        className="descriptionText"
                        dangerouslySetInnerHTML={{ __html: desc }}
                      />
                    </>
                  ) : (
                    <>
                      <div className="descDiv">
                        <h4>Description</h4>
                        <button onClick={updateDescription} className="btnSave">
                          Save
                        </button>
                      </div>

                      <ReactQuill
                        className="editor"
                        theme="snow"
                        value={desc}
                        onChange={(value) => setDesc(value)}
                      />
                    </>
                  )}
                </div>
                <div>
                  <hr />
                  <div className="comment">
                    <FaUserCircle style={{ fontSize: "30px" }} />
                    <input type="text" placeholder="Add a comment..." />
                  </div>

                  <p style={{ fontSize: "15px" }}>
                    <span
                      style={{
                        color: "rgb(131, 131, 131)",
                      }}
                    >
                      Pro tip:
                    </span>{" "}
                    press{" "}
                    <span
                      style={{
                        color: "rgb(95, 95, 95)",
                        backgroundColor: "rgb(214, 214, 214)",
                        padding: "3px 5px",
                      }}
                    >
                      M
                    </span>{" "}
                    to comment
                  </p>
                </div>
              </div>
            </div>

            <div className="div2">
              <div className="details" onClick={openDetails}>
                <p>Details</p>
                {isDetailsOpen ? (
                  <IoIosArrowUp
                    style={{ cursor: "pointer" }}
                    onClick={openDetails}
                  />
                ) : (
                  <IoIosArrowDown
                    style={{ cursor: "pointer" }}
                    onClick={openDetails}
                  />
                )}
              </div>
              {!isDetailsOpen && (
                <div className="dropdownContent">
                  <div>
                    <table className="table-style">
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td>Assignee:</td>
                          <td className="td">
                            <FaUserCircle style={{ fontSize: "30px" }} />
                            {assigned === "" ? "Not Assigned" : assigned}
                            <select
                              className="hello"
                              name="Assignee"
                              value="select"
                              onChange={(e) => editAssignee(e)}
                            >
                              <option value="select">Select an Assignee</option>

                              {selectedProject.projectTeam.map((item, index) =>
                                item.teamRole !== "QA" ? (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                ) : null
                              )}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Reporter:</td>
                          <td className="td">
                            <FaUserCircle style={{ fontSize: "25px" }} />
                            {user.user.name}
                          </td>
                        </tr>
                        <tr>
                          <td>Components:</td>
                          <td>None</td>
                        </tr>
                        <tr>
                          <td>Pipelines:</td>
                          <td>MTV-4215-2</td>
                        </tr>
                        <tr>
                          <td>QA Analyst:</td>
                          <td className="td">
                            <FaUserCircle style={{ fontSize: "30px" }} />
                            {analyst === "" ? "Not Assigned" : analyst}
                            <select
                              className="hello"
                              name="Assignee"
                              value="select"
                              onChange={(e) => editAnalyst(e)}
                            >
                              <option value="select">Select an Analyst</option>
                              {registeredUsers.map((item, index) =>
                                item.teamRole === "QA" ? (
                                  <option key={index}>{item.user}</option>
                                ) : null
                              )}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Developer Change Reason:</td>
                          <td>Original Developer</td>
                        </tr>
                        <tr>
                          <td>Turnback Date:</td>
                          <td>None</td>
                        </tr>
                        <tr>
                          <td>Development:</td>
                          <td className="td1">
                            {" "}
                            <p>
                              Create branch <IoIosArrowDown />
                            </p>
                            <p>
                              Create commit <IoIosArrowDown />{" "}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateModal;
