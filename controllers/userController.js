import User from "../models/userSchema.js";

const signUp = async (req, res) => {
  try {
    const { username,email,password } = req.body;
    const newUser = new User({ username ,email,password});
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};
export default signUp;
