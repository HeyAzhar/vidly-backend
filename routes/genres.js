const { Genre, validate } = require("../models/genres");
const auth = require("../middleware/auth");
const admin = require("../middleware/inAdmin");
const express = require("express");
const router = express.Router();

// ---- Getting all genre
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// ---- Getting a single genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("The genre isn't found!");
  res.send(genre);
});

// ---- Creating new genre
router.post("/", auth, async (req, res) => {
  // Validating input with Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // setting new genre
  let newGenre = new Genre({
    name: req.body.name,
  });

  try {
    newGenre = await newGenre.save();
  } catch (err) {
    console.error(err);
  }

  //sending response back
  res.send(newGenre);
});

// ---- Updating existing genre
router.put("/:id", auth, async (req, res) => {
  //validing input
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the genre exist
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name },
    },
    { new: true }
  );
  if (!genre) return res.send("Genre doesn't exist!");

  //response back
  res.send(genre);
});

// ---- Deleting genre
router.delete("/:id", auth, admin, async (req, res) => {
  //checking if genre exist
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("Genre doesn't exist or already been deleted!");

  res.send(genre);
});

module.exports = router;
