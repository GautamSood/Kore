const Order = require("../models/order_Model");
const Milk = require("../models/milk_Model");
const mongoose = require("mongoose");
const ErrorHandler = require("../util/errorhandler")
const { startOfToday, endOfToday } = require("date-fns");

exports.updateMilkOrderService = async (currentOrder, previousOrder,orderid) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const getMilk = await Milk.findOne({
          createdAt: { $gte: startOfToday(), $lt: endOfToday() },
        });
        if (((getMilk.capacity + previousOrder) - currentOrder) < 0) {
            throw new ErrorHandler("quantity is exceeding the capacity!", 400);
        }
        else {
            const capacity = {
              capacity: (getMilk.capacity + previousOrder) - currentOrder
            };
            const updatedMilk = await Milk.findByIdAndUpdate(getMilk._id, capacity, {
              new: true,
              runValidators: true,
            });
            const orderQuantity = {
                orderQuantity : currentOrder
            }
            const updatedOrder = await Order.findByIdAndUpdate(
              orderid,
              orderQuantity,
              { new: true, runValidators: true }
            );
             await session.commitTransaction();
             return updatedOrder;
        }
    } catch(error) {
         await session.abortTransaction();
         console.log(error);
         throw new ErrorHandler("Something went wrong", 500);
    }
}