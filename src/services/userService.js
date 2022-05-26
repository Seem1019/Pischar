import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import User from "../Models/User.js";
import { generateToken, getUserId } from "../utils/jwt.js";
import { schemaRegister, schemaLogin } from "../utils/Joi.js";

export const register = async (req, res) => {
  const { error } = schemaRegister.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ error: "Email already exist" });
  }
  const { username, password, email, birthDate, bio } = req.body;
  try {
    const user = await User.create({
      username,
      password: hashPassword(password),
      email,
      birthDate,
      bio,
    });
    const token = generateToken(user);
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user_id = getUserId(req);
  if (!user_id) {
    try {
      const { error } = schemaLogin.validate(req.body);
      if (error) return res.status(400).json(error.details[0].message);
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: "User not found" });
      if (!comparePassword(password, user.password)) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = generateToken(user);
      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(200).json({ message: "You are already logged in" });
  }
};
