const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),

  deadline: Joi.string().allow("", null),

  priority: Joi.string()
    .valid("High", "Medium", "Low")
    .required(),

  category: Joi.string()
    .valid("Study", "Work", "Personal", "Health")
    .required(),

  status: Joi.string()
    .valid("todo", "done")
    .optional(),
});

module.exports = taskSchema;