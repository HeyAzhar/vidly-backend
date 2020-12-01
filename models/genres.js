const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

//input validation method
const validateInput = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(genre);
};

module.exports.genreShema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateInput;
