const express = require("express");
const router = express.Router();
const Payment = require("../models/payementModel");

router.post("/add", async (req, res) => {
  try {
    const user = {
      uniqueID: req.body.uniqueID,
      info: req.body.info,
      cardno: req.body.cardno,
      expire: req.body.expire,
      cvv: req.body.cvv,
      price: req.body.price,
    };

    const newBooking = new Payment(user);
    await newBooking.save();
    res.send(newBooking);
  } catch (err) {
    res.send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Payment.find();
    res.send(bookings);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Payment.findById(id);
    res.send(booking);
  } catch (err) {
    res.send(err);
  }
});

router.get("/book/:uniqueID", async (req, res) => {
  try {
    let booking = await Payment.find({ uniqueID: req.params.uniqueID });

    res.json(booking);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newBooking = req.body;
    const booking = await Payment.findByIdAndUpdate(id, newBooking);
    res.send(booking);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Payment.findByIdAndDelete(id);
    res.send(booking);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
