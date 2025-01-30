import axios from "axios";
import { addIssues } from "../store/features/issues/issueSlice";

const IssueRoutes = {
  create: async ({
    title,
    description,
    issueType,
    project_id,
    user_id,
    assignedTo,
    dispatch,
    status,
    taskType,
  }) => {
    try {
      const ticketdata = {
        title,
        description,
        issueType,
        project_id,
        user_id,
        assignedTo,
      };
      const response = await axios.post(
        "http://localhost:3000/home",
        ticketdata
      );

      console.log(status);
      if (response.status === 201) {
        const data = response.data.issue;
        const data1 = { ...data, status, taskType };
        dispatch(addIssues(data1));
      }
    } catch (error) {
      console.log(error);
    }
  },
  update: async ({
    data,
    analyst,
    title,
    description,
    user_id,
    assignedTo,
    dispatch,
    status,
  }) => {
    try {
      const ticketdata = {
        ...data,
        analyst,
        title,
        description,
        user_id,
        assignedTo,
        status,
      };
      const response = await axios.patch(
        `http://localhost:3000/home/${data.issue_id}`,
        ticketdata
      );

      if (response.status === 200) {
        dispatch(updateIssue({ toUpdatedIssue: [ticketdata], user_id }));
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default IssueRoutes;
