require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
app.use(express.json());

require("./startup/prod")(app);
require("./startup/logger")();
require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 1111;

app.listen(port, () => console.log(`>>> Server is running on ${port}`));
