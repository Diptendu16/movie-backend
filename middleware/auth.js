import jwt from "jsonwebtoken";

//get token from cookie
//validate token
//verify the token
//send details ad req.user

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. Please log in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(200).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
