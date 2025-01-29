import React from "react";
import { useDraggable } from "@dnd-kit/core";

function Task({
  updateTicketModal,
  issue_id,
  title,
  assignedTo,
  issueType,
  item,
  index,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: issue_id });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="issuesCreated"
      onClick={() => updateTicketModal(item, index)}
    >
      <h4>issue type - {issueType}</h4>
      <h4>title - {title}</h4>
      <h4>Assigned to - {assignedTo}</h4>
    </div>
  );
}

export default Task;
