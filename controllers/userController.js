import User from "../models/userSchema.js";
import { generatehashedPassword, comparePassword } from "../utils/bcrypt.js";
import generateAccessToken from "../utils/jwt.js";
import EmailValidation from "../validation/validation.js";
// import bcrypt from "bcrypt"

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }


    if (!EmailValidation(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    
    const hashedPassword = await generatehashedPassword(password);

    
    const newUser = new User({
      username,
      email,
      password: hashedPassword, 
    });

    await newUser.save();

    
    const { _id, username: savedUsername, email: savedEmail } = newUser;

    
    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: _id,
        username: savedUsername,
        email: savedEmail,
        password: hashedPassword,
      },
    });
  } catch (error) {
   
    console.error("Error in signUp:", error.message);
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: `oops,error occured` });
    }

    const ValidPassword = await comparePassword(password, user.password);

    console.log(ValidPassword)

    if (!ValidPassword) {
      return res.status(401).json({ message: "Invalid user information" });
    }
    console.log(`user id:${user.id}`)

    const accessToken = generateAccessToken(user.id)
    console.log(accessToken)

    res.status(200).json({success:true,data:user.username,accessToken})
 
    // res.status(200).json({ message: `Hello, ${user.username}` });
  } catch (error) {
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};
export { signUp, login };
//   export default login;
