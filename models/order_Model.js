const mongoose = require("mongoose");
const validator = require("validator");

const OrderSchema = new mongoose.Schema(
  {
    orderDate: {
      type: Date,
    },
    orderStatus: {
      type: String,
      required: [true, "Please provide a status!"],
      default: "placed"
    },
    orderQuantity: {
      type: Number,
      required: [true, "Please provide order quantity!"],
    },
    customerName: {
      type: String,
      required: [true, "Please provide a name!"],
    },
    customerContact: {
      type: String,
      minLength: 10,
      maxLength: 10,
    },
    customerEmail: {
      type: String,
      required: [true, "Please provide an email!"],
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;

