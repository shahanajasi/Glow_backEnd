import jwt from "jsonwebtoken";
const generateAccessToken = (userID) => {
  return jwt.sign({ _id: userID }, process.env.ACCESS_TOKEN_SECRET);
};
export default generateAccessToken;
