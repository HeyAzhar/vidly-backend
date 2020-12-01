const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = () => {
  //---- Configue winston for logging error
  winston.configure({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "error.log",
        level: "error",
        handleExceptions: true,
      }),
      // new winston.transports.MongoDB({
      //   db: process.env.DATABASE,
      //   level: "error",
      //   handleExceptions: true,
      // }),
    ],
  });
  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message, ex);
    // throw ex;
  });
};
