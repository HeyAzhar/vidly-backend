const { Customer, validate } = require("../models/customers");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

// ---- get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  if (customers.length === 0) return res.send("Customer data is empty!");
  res.send(customers);
});

// ----get One customer
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("No customer found!");
  res.send(customer);
});

//---- creating new customer
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let newCustomer = new Customer({
    name: req.body.name,
    number: req.body.number,
    isGold: req.body.isGold,
  });

  try {
    newCustomer = await newCustomer.save();
  } catch (err) {
    console.error(err);
  }
  res.send(newCustomer);
});

//---- updating customer
router.put("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        number: req.body.number,
        inGold: req.body.isGold,
      },
    },
    { new: true }
  );
  if (!customer) return res.status(404).send("No customer found!");
  res.send(customer);
});

//---- Deleting customer
router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("Customer isn't found or has been removed!");
  res.send(customer);
});

module.exports = router;
