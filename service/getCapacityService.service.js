const Order = require("../models/order_Model");
const Milk = require("../models/milk_Model");
const mongoose = require("mongoose");
const ErrorHandler = require("../util/errorhandler");
const { startOfToday, endOfToday } = require("date-fns");

exports.getCapacityService = async (req) => {
  try {
    const { date } = req.params;
    const isoDate = new Date(+date);
    const startOfDate = startOfToday(isoDate);
    const endOfDate = endOfToday(isoDate);
    const milkRecord = await Milk.findOne({
      createdAt: { $gte: startOfDate, $lt: endOfDate },
    });
    return milkRecord;
  } catch (error) {
    console.log(error);
    throw new ErrorHandler("something went wrong", 500);
  }
};
