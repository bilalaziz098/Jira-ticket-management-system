const express = require('express')
const projectRouter = express.Router();
const dotenv = require('dotenv');
const {Project} = require('../models');

dotenv.config()


projectRouter.post('/projects', async(req, res) => {
  const {project_name} = req.body;
  console.log("name is" , project_name)
  try {
    const project = await Project.create({
      project_name
    })

    return res.json({message: 'Project created', project})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server error' });
  }
});

projectRouter.patch('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const {project_name} = req.body; 

  try {
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
  
    project.project_name = project_name || issue.project_name; 
  
    await project.save();

    return res.status(200).json({ message: 'Project updated successfully', project});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {projectRouter}