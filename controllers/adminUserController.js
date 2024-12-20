import express from "express"
import User from "../models/userSchema.js";
import generateAccessToken from "../utils/jwt.js";
const adminGetAllUsers = async(req,res)=>{
    try{
        const adminId= req.params.id

        const admin = await User.findById(adminId)


        if(!admin){
            return res.status(401).json({message:'Admin not Found'})
        }

        const accessToken = generateAccessToken(admin.id);
        
        // res.status(201).json({message:"Admin Login Successfully",admin,accessToken})

        
        const users = await User.find()

        if(users.length === 0 ){
            return res.status(401).json({message:"User Not Found"})
        }

        return res.status(200).json({ message: "Users fetched successfully", users });

    }
    catch(error){
        return res.status(401).json({error:error.message})
    }

}

export default adminGetAllUsers