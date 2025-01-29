const express = require('express')
const issueRouter = express.Router();
const dotenv = require('dotenv');
const {Issue} = require('../models');
dotenv.config()


issueRouter.post('/home', async(req, res) => {
  const {title, description, issueType, user_id, assignedTo, project_id} = req.body;
  try {
    const issue = await Issue.create({
      title,
      description,
      issueType,
      user_id,
      assignedTo,
      project_id
    })

    return res.status(201).json({message: 'Issue created', issue})
  } catch (error) {
    console.log(error)
    return res.status(406).json({ message: 'not acceptable' });
  }
})
issueRouter.delete('/home/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findByPk(id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    await issue.destroy();
    return res.status(205).json({ message: 'issue deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});
issueRouter.patch('/home/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, assignedTo, title, description} = req.body; 

  try {
    const issue = await Issue.findByPk(id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
  
    issue.user_id = user_id || issue.user_id; 
    issue.assignedTo = assignedTo || issue.assignedTo; 
    issue.title = title || issue.title; 
    issue.description = description || issue.description; 
   
    await issue.save();

    return res.status(200).json({ message: 'Issue updated successfully', issue });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {issueRouter}