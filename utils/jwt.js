import jwt from "jsonwebtoken";
const generateAccessToken = (userID,email) => {
  return jwt.sign({ _id: userID ,email}, process.env.ACCESS_TOKEN_SECRET);
};
const verifytoken = (token)=>{
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
export {generateAccessToken,verifytoken};
