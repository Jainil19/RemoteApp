const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res
      .status(403)
      .json({ status: "Error", message: "Header Token is required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ status: "Error", message: "Invalid Token" });
  }
};

module.exports = verifyToken;
