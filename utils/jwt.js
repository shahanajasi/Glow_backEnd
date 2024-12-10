import jwt from "jsonwebtoken"
const generateAccessToken = (userID)=>{
    return jwt.sign({_id:userID},"something")
}
export default generateAccessToken