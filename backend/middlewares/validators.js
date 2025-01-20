const Joi = require('joi');

const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      const errors = error.details[0].message;
      console.log(errors)
      return res.status(400).json({ message: errors });
    }
    next();
  }
}

const signupValidate = Joi.object({
  name: Joi.string().required().messages({
    'string.empty' : 'Name is required'
  }),
  role: Joi.string().required().messages({
    'string.empty' : 'Role is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email' : 'Invalid email',
    'string.empty' : 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min' : 'Password must be of atleast 6 characters',
    'string.empty' : 'Password is required'
  })
})

const loginValidate = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format.',
    'string.empty': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
  }),
});

module.exports = {validator, 
  schema : {
  signupValidate, loginValidate}
}