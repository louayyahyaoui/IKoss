const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  if (accessToken) {
    jwt.verify(accessToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.userId = decoded.id;
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ error: "No token provided" });
  }
};
