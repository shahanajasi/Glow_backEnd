import User from "../models/userSchema.js";
import { verifytoken} from "../utils/jwt.js";

const adminproduct = async (req,res,next) =>{
    try{
        console.log("triggered")
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({message:"access denied,no token provided"})
        }
        const verifiedtoken = verifytoken(token);
        console.log(verifiedtoken)
         
        req.user = verifiedtoken

        if(!verifiedtoken){
            return res.status(500).json({message:"you are not authorized"})
        }
          next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export default adminproduct