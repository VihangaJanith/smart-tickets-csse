const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    uniqueID: {
      type: String,
    },
    info: {
      type: String,
    },
    cardno: {
      type: String,
    },
    expire: {
      type: String,
    },
    cvv: {
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

const PaymentModel = mongoose.model("PaymentsTicketing", PaymentSchema);

module.exports = PaymentModel;
