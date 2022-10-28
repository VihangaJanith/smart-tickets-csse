const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeliverySchema = new Schema(
  {
    uniqueID: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
    },
    postalcode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Delivery = mongoose.model("DeliveryTicketing", DeliverySchema);

module.exports = Delivery;
