const express = require("express");
const router = express.Router();
const Journey = require("../models/journeyModel");

router.post("/add", async (req, res) => {
  try {
    const user = {
      uniqueID: req.body.uniqueID,
      start: req.body.start,
      end: req.body.end,
      distance: req.body.distance,
      price: req.body.price,
    };

    const newBooking = new Journey(user);
    await newBooking.save();
    res.send(newBooking);
  } catch (err) {
    res.send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Journey.find();
    res.send(bookings);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Journey.findById(id);
    res.send(booking);
  } catch (err) {
    res.send(err);
  }
});

router.get("/book/:uniqueID", async (req, res) => {
  try {
    let booking = await Journey.find({ uniqueID: req.params.uniqueID });

    res.json(booking);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newBooking = req.body;
    const booking = await Journey.findByIdAndUpdate(id, newBooking);
    res.send(booking);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Journey.findByIdAndDelete(id);
    res.send(booking);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
