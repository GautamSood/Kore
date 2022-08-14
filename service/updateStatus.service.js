const Order = require("../models/order_Model");
const mongoose = require("mongoose");
const ErrorHandler = require("../util/errorhandler");
const CatchAsyncError = require("../middleware/catchAsyncError");

const filterRequest = (obj, ...allowedFields) => {
  let newObject = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObject[el] = obj[el]; //add desired fields to new obj
    }
  });
  const arr = ["dispatched", "packed", "delivered", "placed"];
  if (arr.includes(newObject.orderStatus)) {
    return newObject;
  }
};

exports.updateStatusService = async (req) => {
  try {
    const { id } = req.params;
    const filteredObj = filterRequest(req.body, "orderStatus");
    console.log(filteredObj);
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      filteredObj,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(id);
    console.log(updatedOrder);
    return updatedOrder;
  } catch (error) {
    throw new Error(error);
  }
};
