import jwt from "jsonwebtoken";

const checkauth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log( token); 

    if (!token) {
      return res.status(401).json({
        message: `Access denied`,
      });
    }

    const tokenValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!tokenValid) {
      return res.status(500).json({ message: `You are not authorized` });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default checkauth;
