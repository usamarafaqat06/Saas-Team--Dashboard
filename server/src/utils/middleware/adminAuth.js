const jwt = require("jsonwebtoken");

const checkAdminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized token not found" });
  }
  return jwt.verify(token, "secret_is_a_secret", (err, decoded) => {
    if (err) {
      console.log(err, "err")
      return res.status(400).json({ status: false, message: "invalid Token", err });
    }
    req.user = decoded;
    return next();
  });
};
exports.checkAdminAuth = checkAdminAuth;
