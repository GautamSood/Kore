const Order = require("../models/order_Model");
const Milk = require("../models/milk_Model");
const mongoose = require("mongoose");
const { startOfToday, endOfToday } = require("date-fns");
const { createMilkService } = require("../service/createMilkSerivce.service");
const { updateMilkService } = require("../service/updateMilkService.service");

exports.createOrderService = async (req, res) => {
  const {
    customerContact,
    customerEmail,
    orderStatus,
    customerName,
    orderQuantity,
  } = req.body;

  const session = await mongoose.startSession();
  try {
    let DailyMilk;
    session.startTransaction();
      const getMilk = await Milk.findOne({
        createdAt: { $gte: startOfToday(), $lt: endOfToday() },
      });
      if (!getMilk) {
        DailyMilk = await createMilkService(session);
      } else {
        DailyMilk = getMilk;
      }
    //console.log(DailyMilk);
    if (orderQuantity > DailyMilk.capacity) {
      throw new Error("quantity is exceeding the capacity!");
    } else {
      const newOrder = await Order.create(
        [
          {
            customerName,
            customerEmail,
            customerContact,
            orderQuantity,
            orderStatus,
          },
        ],
        { session }
      );
      const updatedMilk = await updateMilkService(orderQuantity, DailyMilk._id);
      await session.commitTransaction();
      return newOrder;
    }
  } catch (error) {
    await session.abortTransaction();
    throw new Error(error);
  }
  await session.endSession();
};