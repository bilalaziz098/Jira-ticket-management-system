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
    updateProject: (state, action) => {
      const { toUpdatedProject } = action.payload;
      console.log(toUpdatedProject);
      state.projects = state.projects.map((project) =>
        project.project_id === toUpdatedProject[0].project_id
          ? { ...project, ...toUpdatedProject[0] }
          : project
      );
      console.log(state.projects);
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

export const {
  addProjects,
  setError,
  deleteProject,
  resetprojects,
  updateProject,
} = projectSlice.actions;
export default projectSlice.reducer;
