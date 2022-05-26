import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (user) => {
  const payload = {
    user_id: user._id.valueOf(),
    name: user.username,
    email: user.email,
  };
  const options = {
    expiresIn: "1h",
  };
  // eslint-disable-next-line no-undef
  return jwt.sign(payload, process.env.SECRET || "secret", options);
};

export const getUserId = (req) => {
  const token = req.body.token || req.query.token || req.headers["token"];
  if (!token) return null;
  try {
    // eslint-disable-next-line no-undef
    const { user_id } = jwt.verify(token, process.env.SECRET || "secret");
    return user_id;
  } catch (error) {
    return null;
  }
};
