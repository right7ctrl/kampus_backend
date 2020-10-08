const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const tokenFull = req.headers.authorization?.split(" ");
    if (!tokenFull || tokenFull.length < 2) {
      throw "token format error";
    }

    const token = tokenFull[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).send({
      response: 2,
      message: "Auth failed",
    });
  }
};
module.exports = authMiddleware;
