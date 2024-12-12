import jwt from "jsonwebtoken"
const checkauth = (req,res,next)=>{
    try{
        const token = req.headers.authorization
        console.log(token)
        if(!token){
            return res.status(401).json({
                message:`Access denied`
            })
        }
        const tokenaValid = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET )
        if(!tokenaValid){
            return res.status(500).json({message:`you are not authorized`})
        }

        next()
    }catch(error){
        res.status(401).json({succes:false,message:error.message})
    }
}
export default checkauth