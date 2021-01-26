const { validate, Rental } = require("../models/rentals");
const { Customer } = require("../models/customers");
const { Movie } = require("../models/movies");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Transaction = require("mongoose-transactions");
const express = require("express");
const router = express.Router();
const transaction = new Transaction();

//---- Get all rentals
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

//---- Create rental
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Customer is invalid!");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Movie is invalid!");

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie is not in stock");

    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        number: customer.number,
        isGold: customer.isGold,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    // use transaction
    transaction.insert("Rental", rental);
    transaction.update(
      "Movie",
      { _id: movie._id },
      { numberInStock: movie.numberInStock - 1 },
      { new: true }
    );

    const result = await transaction.run();

    res.send(result);
  } catch (error) {
    const issue = await transaction.rollback();
    console.log(issue);
    return res.status(400).send("Transaction failed!");
  } finally {
    transaction.clean();
  }
});

module.exports = router;
