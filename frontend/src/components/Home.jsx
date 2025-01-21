import React, { useState } from "react";
import "./Home.css";
import { FaBolt, FaRegStar, FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import Nav from "./Nav";
import TicketModal from "./TicketModal";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closestCorners, DndContext } from "@dnd-kit/core";
import UpdateModal from "./UpdateModal";
import Tasks from "./Tasks";
import { updateIssueStatus } from "../features/issues/issueSlice";

function Home() {
  const { issues } = useSelector((state) => state.issues);
  const [updateTicket, setUpdateTicket] = useState(null);
  const [showSide, setShowSide] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

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
  // console.log(issues.status, "sad");

  // const handleDragEnd = (event) => {
  //   const { active, over } = event;
  //   console.log("Active id is: ", active.id, "over id is ", over.id);

  //   if (active.id === over.id) return console.log("hello");
  //   // console.log(issues.status);

  //   setTasks((tasks) => {
  //     const originalPos = issuePos(active.id);
  //     const newPos = issuePos(over.id);
  //     const updatedIssue = {
  //       status: tasks.status,
  //     };
  //     dispatch(updateIssue({ toUpdatedIssue: [updatedIssue] }));
  //     return arrayMove(tasks, originalPos, newPos);
  //   });
  // };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    const draggedTask = issues.find((task) => task.issue_id === active.id);
    if (!draggedTask) return;

    const newStatus = over.id;

    console.log(draggedTask, active.id, newStatus);

    dispatch(
      updateIssueStatus({
        id: draggedTask.issue_id,
        status: newStatus,
      })
    );
  };

  return (
    <>
      <Nav setShowSide={setShowSide} showSide={showSide} />
      <div className="container">
        <div className={`content ${showSide ? "shift-left" : ""}`}>
          <div className="project-head">
            <h3>Project Name</h3>
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
