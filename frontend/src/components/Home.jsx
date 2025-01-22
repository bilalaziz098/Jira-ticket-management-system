import React, { useEffect, useState } from "react";
import "./Home.css";
import { FaBolt, FaRegStar, FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import Nav from "./Nav";
import TicketModal from "./TicketModal";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { DndContext } from "@dnd-kit/core";
import UpdateModal from "./UpdateModal";
import Tasks from "./Tasks";
import { updateIssueStatus } from "../features/issues/issueSlice";
import { useNavigate, useParams } from "react-router-dom";

function Home() {
  const { issues } = useSelector((state) => state.issues);
  const { projects } = useSelector((state) => state.projects);
  const [updateTicket, setUpdateTicket] = useState(null);
  const [showSide, setShowSide] = useState(true);
  const [projectName, setProjectName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { projectId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleOpenModal = () => {
    user.user.role === "Project Manager"
      ? setIsModalOpen(true)
      : setIsModal2Open(true);
  };

  const updateTicketModal = (issue, index) => {
    setUpdateModalOpen(true);
    setUpdateTicket({ issue, index });
  };

  const statuses = ["TO DO", "IN PROGRESS", "DONE"];

  const issuePos = (id) => issues.findIndex((task) => task.issue_id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    const draggedTask = issues.find((task) => task.issue_id === active.id);
    if (!draggedTask) return;

    const { role } = user.user;
    console.log("user is", role);
    console.log("task is", draggedTask.status);

    if (role === "QA") {
      if (draggedTask.status === "DONE" && over.id === "IN PROGRESS") {
        dispatch(
          updateIssueStatus({
            id: draggedTask.issue_id,
            status: "IN PROGRESS",
          })
        );
      } else {
        console.log("not allowed");
      }
    } else if (role === "Developer") {
      if (
        (draggedTask.status === "TO DO" ||
          draggedTask.status === "IN PROGRESS") &&
        (over.id === "IN PROGRESS" || over.id === "DONE")
      ) {
        const newStatus = over.id;
        dispatch(
          updateIssueStatus({
            id: draggedTask.issue_id,
            status: newStatus,
          })
        );
      } else if (draggedTask.status === "IN PROGRESS" && over.id === "DONE") {
        const newStatus = over.id;
        dispatch(
          updateIssueStatus({
            id: draggedTask.issue_id,
            status: newStatus,
          })
        );
      } else {
        console.log(over.id);
      }
    } else {
      const newStatus = over.id;
      dispatch(
        updateIssueStatus({
          id: draggedTask.issue_id,
          status: newStatus,
        })
      );
    }
  };

  useEffect(() => {
    projects.find((item) =>
      item.project_id === Number(projectId)
        ? setProjectName(item.project_name)
        : null
    );
  }, []);

  const navigateProjects = () => {
    navigate("/projects");
  };

  return (
    <>
      <Nav setShowSide={setShowSide} showSide={showSide} />
      <div className="container">
        <div className={`content ${showSide ? "shift-left" : ""}`}>
          <div className="project-head">
            <div className="projectTitle">
              <h3>{projectName}</h3>
              <p onClick={navigateProjects}>Select other Project</p>
            </div>
            <div>
              <FaBolt className="icons" />
              <FaRegStar className="icons" />
              <HiDotsHorizontal className="icons" />
            </div>
          </div>
          <div className="links">
            <input type="search" />
            <p>{user.user.name}</p>
            <FaUserCircle className="icons" />
          </div>
          <DndContext onDragEnd={handleDragEnd}>
            <Tasks
              handleOpenModal={handleOpenModal}
              updateTicketModal={updateTicketModal}
              statuses={statuses}
            />
          </DndContext>

          {isModal2Open && (
            <div className="modal2">
              <div className="modalContainer2">
                <IoMdClose
                  className="cross"
                  onClick={() => setIsModal2Open(false)}
                />

                <div className="title2">
                  <p>Sign in as Project Manager to create a ticket</p>
                </div>
              </div>
            </div>
          )}
          {isModalOpen && <TicketModal setIsModalOpen={setIsModalOpen} />}
          {updateModalOpen && (
            <UpdateModal
              setUpdateModalOpen={setUpdateModalOpen}
              updateTicket={updateTicket}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
