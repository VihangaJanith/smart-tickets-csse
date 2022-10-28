const express = require("express");
const router = express.Router();
const Delivery = require("../models/deliveryModel");

router.post("/add", async (req, res) => {
  try {
    const user = {
      uniqueID: req.body.uniqueID,
      address: req.body.address,
      phone: req.body.phone,
      city: req.body.city,
      province: req.body.province,
      postalcode: req.body.postalcode,
    };

    const newBooking = new Delivery(user);
    await newBooking.save();
    res.send(newBooking);
  } catch (err) {
    res.send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Delivery.find();
    res.send(bookings);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Delivery.findById(id);
    res.send(booking);
  } catch (err) {
    res.send(err);
  }
});

router.get("/book/:uniqueID", async (req, res) => {
  try {
    let booking = await Delivery.find({ uniqueID: req.params.uniqueID });

    res.json(booking);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newBooking = req.body;
    const booking = await Delivery.findByIdAndUpdate(id, newBooking);
    res.send(booking);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Delivery.findByIdAndDelete(id);
    res.send(booking);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
