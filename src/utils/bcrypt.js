import bcrypt from "bcrypt";

export const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const comparePassword = (password, hash) =>
  bcrypt.compareSync(password, hash);
