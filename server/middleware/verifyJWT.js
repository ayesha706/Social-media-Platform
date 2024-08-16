const jwt = require('jsonwebtoken');

module.exports.verifyJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.json({ msg: 'Unauthorized: No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    // console.log("decodedecodedecodedecode", decoded);
    req.user = { id: decoded.user };
console.log(req.user)
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Unauthorized: Invalid token' });
  }
};
