const mongoose = require("mongoose");
const Joi = require("joi");

const customerShcema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  number: {
    type: String,
    minlength: 10,
    maxlength: 13,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

// validate input
const validateInput = (customer) => {
  const shcema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    number: Joi.string().min(10).max(13).required(),
    isGold: Joi.boolean(),
  });
  return shcema.validate(customer);
};

const Customer = mongoose.model("Customer", customerShcema);

module.exports.Customer = Customer;
module.exports.validate = validateInput;
