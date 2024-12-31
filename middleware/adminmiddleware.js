import User from "../models/userSchema.js";
import { verifytoken } from "../utils/jwt.js";

const authorizeAdmin = async(req, res, next) => {
      try {
        console.log("AuthorizeAdmin middleware is triggered");

        const adminEmail = req.body.email;
        console.log(adminEmail)

        const token = req.headers.authorization;
        console.log(token)

        
        if (!token) {
          return res.status(401).json({message: `Access denied`});
        }
        
        const vertoken = verifytoken(token)
        console.log(vertoken)
        if (!vertoken) {
          return res.status(500).json({ message: `You are not authorized` });
        }

        const admin = await User.findOne({ email: "admin@gmail.com" });
        console.log(admin)
        
        
       
        if (adminEmail !== admin.email) {
            return res.status(403).json({ message: 'Access denied. Invalid admin information' });
        }
    
        next();

      } catch (error) {
        return res.status(500).json({error: error.message });
      }

    
};

export default authorizeAdmin;

