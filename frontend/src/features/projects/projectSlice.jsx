import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  projects: [],
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProjects: (state, action) => {
      const projectAdded = action.payload;
      state.projects.push(projectAdded);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    deleteProject: (state, action) => {
      const { project_id } = action.payload;
      state.projects = state.projects.filter(
        (project) => project.project_id !== project_id
      );
    },
    resetprojects: (state, action) => {
      state.projects = [];
    },
  },
});

export const { addProjects, setError, deleteProject, resetprojects } =
  projectSlice.actions;
export default projectSlice.reducer;
