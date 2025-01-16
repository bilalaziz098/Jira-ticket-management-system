const express = require('express')
const router = express.Router();
const {Users} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const { validator,schema } = require('../middlewares/validators');
dotenv.config()

const SECRET = process.env.JWT_SECRET;

router.post('/signup', validator(schema.signupValidate), async(req, res) => {
  const {name, email, password} = req.body;
  try {
    const existingUsers = await Users.findOne({where: {email} })
    if (existingUsers) return res.json({message: "user already registered"}) 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await Users.create({
      name: name,
      email: email,
      password: hashedPassword
    })

    return res.json({message: 'user created', user})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server error' });
  }
})

router.post('/', validator(schema.loginValidate), async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await Users.findOne({where : {email}})
    if(!user) return res.status(404).json({message: "Invalid credentials"})

    console.log("user logged in is: ", user.name)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(404).json({message: "Invalid credentials"})
      
    return res.status(200).json({message: "user successfully logged in", user: {id : user.id, user : user.email, name: user.name}})

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server error' });
  }
})

router.get('/home', async (req, res) => {
  try {
    const users = await Users.findAll()
    return res.json(users)
  } catch (error) {
    console.log(error)
  }
})

module.exports = {router}