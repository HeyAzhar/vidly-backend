const mongoose = require("mongoose");
const winston = require("winston");

// ---- Connect to db
module.exports = () => {
  mongoose
    .connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => winston.info(">>> Connected to Database"));
};
