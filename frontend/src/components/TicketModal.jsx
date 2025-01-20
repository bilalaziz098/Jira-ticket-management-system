import React, { useState } from "react";
import "./TicketModal.css";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addIssues } from "../features/issues/issueSlice";
import { reset } from "../features/auth/authSlice";

function TicketModal({ setIsModalOpen }) {
  const { user, registeredUsers } = useSelector((state) => state.auth);
  // console.log("Ssasd", user.user.id);

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");
  const submitForm = async (event) => {
    event.preventDefault();

    const ticketData = {
      title,
      description: description,
      issueType: issue,
      user_id: user.user.id,
      assignedTo,
      status,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/home",
        ticketData
      );
      const data = response.data.issue;

      const data1 = { ...data, status };
      dispatch(addIssues(data1));
    } catch (error) {
      console.log("err", error);
    }

    setIsModalOpen(false);
  };
  // dispatch(reset());
  // const handledesc = (e) => {
  //   // console.log(e);
  //   setDescription(e.target.value);
  // };

  // const myself = () => {
  //   setAssignedTo(user.email);
  // };
  const assignMyself = () => {
    const me = user.user.name;
    setAssignedTo(me);
  };

  return (
    <>
      <div className="modal">
        <div className="modalContainer">
          <div className="title">
            <p>Create issue </p>
            <div>
              <button className="btn1">Import issues</button>
              <button className="btn1">Configure fields</button>
            </div>
          </div>
          <form className="ticketForm" action="" onSubmit={submitForm}>
            <label className="label project">Project</label>
            <select name="type">
              <option value="Project 1">Project 1</option>
              <option value="Project 2">Project 2</option>
              <option value="Project 3">Project 3</option>
            </select>

            <label className="label issue">Issue Type</label>
            <select
              name="issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            >
              <option>Select an Issue</option>
              <option>Task</option>
              <option>Sub Task</option>
              <option>Bug</option>
              <option>Storing</option>
            </select>
            <p>
              Some issue types are unavailable due to incompatible field
              configuration and/or workflow associations
            </p>
            <label className="status">Status</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Select an Issue</option>
              <option>TO DO</option>
              <option>IN PROGRESS</option>
              <option>DONE</option>
            </select>

            <div
              style={{
                borderBottom: "1px",
                marginTop: "15px",
                backgroundColor: "rgb(216, 216, 216)",
                width: "100%",
                height: "1px",
              }}
            ></div>
            <div className="summary">
              <p>Summary</p>
              <input type="text" onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="description1">
              <p>Description</p>
              <ReactQuill
                className="editor"
                theme="snow"
                value={description}
                onChange={(value) => setDescription(value)}
              />
            </div>

            <label className="label assignee">Assignee</label>
            <select
              name="Assignee"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select an Assignee</option>
              {registeredUsers.map((item, index) => (
                <option key={index} value={item.user}>
                  {item.user}
                </option>
              ))}
            </select>
            <p
              style={{ cursor: "pointer", color: "blue" }}
              onClick={assignMyself}
            >
              Assign to me
            </p>

            <label className="label labels">Labels</label>
            <select name="type">
              <option value="javascript">Label1</option>
              <option value="php">Label2</option>
              <option value="java">Label3</option>
            </select>
            <p>
              Begin typing to find and create labels or press down to select a
              suggested label.
            </p>

            <label className="label attachment">Attachment</label>
            <input type="file" className="file" />

            <label className="label linked">Linked Issues</label>
            <select name="type">
              <option value="javascript">Blocks</option>
              <option value="php">Blocks2</option>
              <option value="java">User3</option>
            </select>
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

export default TicketModal;
