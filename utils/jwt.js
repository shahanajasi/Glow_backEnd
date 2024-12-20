import jwt from "jsonwebtoken";
const generateAccessToken = (userID,email) => {
  return jwt.sign({ _id: userID ,email}, process.env.ACCESS_TOKEN_SECRET);
};
export default generateAccessToken;
