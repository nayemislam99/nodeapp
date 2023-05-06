/* eslint-disable no-unused-vars */
const notFoundMiddleware = (req, res, next) => {
  res.status(404).send('Requested url not found!');
};

module.exports = notFoundMiddleware;
