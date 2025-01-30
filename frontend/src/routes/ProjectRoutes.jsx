import axios from "axios";
import {
  addProjects,
  updateProject,
} from "../store/features/projects/projectSlice";

const ProjectRoutes = {
  create: async ({ project_name, projectTeam, dispatch }) => {
    console.log(project_name);
    try {
      const projectData = {
        project_name,
        projectTeam,
      };
      const response = await axios.post("http://localhost:3000/projects", {
        project_name,
      });

      if (response.status === 201) {
        const Res = response.data.project.project_id;
        const data = { ...projectData, project_id: Res };
        dispatch(addProjects(data));
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  update: async ({ projectData, project_name, projectTeam, dispatch }) => {
    try {
      const updatedProject = { ...projectData, project_name, projectTeam };
      const response = await axios.patch(
        `http://localhost:3000/projects/${projectData.project_id}`,
        updatedProject
      );

      if (response.status === 200) {
        dispatch(updateProject({ toUpdatedProject: [updatedProject] }));
      }
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  },
};

export default ProjectRoutes;
