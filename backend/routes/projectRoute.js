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

module.exports = {projectRouter}