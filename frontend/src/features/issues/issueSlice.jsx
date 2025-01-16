import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  issues: [],
  error: null,
};

const issueSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action) => {
      state.issues = action.payload;
    },
    addIssues: (state, action) => {
      const issue = action.payload;

      state.issues.push(issue);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    deleteIssue: (state, action) => {
      const { issue_id } = action.payload;
      state.issues = state.issues.filter(
        (issue) => issue.issue_id !== issue_id
      );
    },
    updateIssue: (state, action) => {
      const { toUpdatedIssue } = action.payload;
      state.issues = state.issues.map((issue) =>
        issue.issue_id === toUpdatedIssue[0].issue_id
          ? { ...issue, ...toUpdatedIssue[0] }
          : issue
      );
      console.log(state.issues);
    },
    updateIssueStatus: (state, action) => {
      const { id, status } = action.payload;
      console.log(id, status);
      const issue = state.issues.find((issue) => issue.issue_id === id);
      console.log(issue);
      if (issue) issue.status = status;
    },
  },
});
export const {
  setIssues,
  addIssues,
  setError,
  deleteIssue,
  updateIssue,
  updateIssueStatus,
} = issueSlice.actions;
export default issueSlice.reducer;
