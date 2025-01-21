import React from "react";
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";
import { useParams } from "react-router-dom";

function Tasks({ statuses, updateTicketModal, handleOpenModal }) {
  const { issues } = useSelector((state) => state.issues);

  const { projectId } = useParams();

  return (
    <>
      <div className="tickets">
        {statuses.map((status) => {
          const { setNodeRef } = useDroppable({
            id: status,
          });

          return (
            <div key={status} className="cards" ref={setNodeRef}>
              <p>{status}</p>
              <h3 onClick={handleOpenModal}>
                <IoMdAdd />
                <span
                  style={{
                    backgroundColor: "rgb(226, 226, 226)",
                    padding: "5px 20px",
                    borderRadius: "5px",
                  }}
                >
                  Create issue
                </span>
              </h3>

              {issues
                .filter(
                  (item) =>
                    item.status === status && item.project_id === projectId
                )
                .map((item, index) => (
                  <Task
                    key={item.issue_id}
                    issue_id={item.issue_id}
                    title={item.title}
                    assignedTo={item.assignedTo}
                    issueType={item.issueType}
                    index={index}
                    item={item}
                    updateTicketModal={updateTicketModal}
                  />
                ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Tasks;
