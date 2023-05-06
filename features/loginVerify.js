/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');

const loginVerify = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];
  try {
    if (!token) {
      res.status(401).json({ fail: 'Authentications fail!' });
    } else {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      req.userId = decode.id;
      req.userName = decode.name;
      next();
    }
  } catch (error) {
    res.status(401).json({ fail: 'Authentications fail!' });
  }
};

module.exports = loginVerify;
