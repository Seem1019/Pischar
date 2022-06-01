import Joi from "joi";

export const schemaRegister = Joi.object({
  username: Joi.string().min(4).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  birthDate: Joi.date().required(),
  bio: Joi.string().empty(""),
});

export const schemaLogin = Joi.object({
  username: Joi.string().min(4).max(255).required(),
  password: Joi.string().min(6).max(1024).required(),
});
