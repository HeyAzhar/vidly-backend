const winston = require("winston");

module.exports = (err, req, res, next) => {
  winston.error(err.message);
  // winston.log({
  //   level: "error",
  //   message: err.message,
  //   metadata: err,
  // });
  res.status(500).send("Server issue!!");
};
