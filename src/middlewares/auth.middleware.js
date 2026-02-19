const jwt = require("jsonwebtoken")

const tokenVerification = (req,res,next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthrized access token no provided",
    });
  }

  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

  } catch (err) {

    return res.status(401).json({
      message: "Unauthrized access",
    });
  }

  req.user= verifiedToken 


  next()

};

module.exports = tokenVerification;
