const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Titlle cannot be empty'
  }),
  completed: Joi.boolean()
});

module.exports = taskSchema;
