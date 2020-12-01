const mongoose = require("mongoose");
const Joi = require("joi");
const genreSchema = require("./genres");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    maxlength: 50,
    trim: true,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

const validateInput = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  return schema.validate(movie);
};

module.exports.Movie = Movie;
module.exports.validate = validateInput;
