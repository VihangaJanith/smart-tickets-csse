const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JourneySchema = new Schema(
  {
    uniqueID: {
      type: String,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    distance: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Journey = mongoose.model("JourneyTicketing", JourneySchema);

module.exports = Journey;
