const Order = require("../models/order_Model");
const Milk = require("../models/milk_Model");
const mongoose = require("mongoose");
const { startOfToday, endOfToday } = require("date-fns");

exports.deleteOrderService = async (id) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const order = await Order.findById(id);
    if (!order) {
      //CHECK ORDER EXISTS OR NOT
      throw new Error("no such order exists!");
    }
    if (order.orderStatus === "delivered") {
      //CHECK ORDER STATUS IS DELIVERED OR NOT
      await Order.findByIdAndDelete(order._id); //DELETE ORDER
    }
    if (order.orderStatus === "dispatched") {
      throw new Error("order cannot be deleted once dispatched!");
    } else {
      const milk = await Milk.findOne({
        createdAt: { $gte: startOfToday(), $lt: endOfToday() },
      });
      const newCapacity = {
        capacity: milk.capacity + order.orderQuantity,
      };
      await Milk.findByIdAndUpdate(milk._id, newCapacity, {
        new: true,
        runValidators: true,
      }); //UPDATE MILK QUANTITY BACK
      await Order.findByIdAndDelete(order._id); //DELETE ORDER
    }
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw new Error(error);
  }
};
