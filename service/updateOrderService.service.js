const Order = require("../models/order_Model");
const Milk = require("../models/milk_Model");
const mongoose = require("mongoose");
const { startOfToday, endOfToday } = require("date-fns");


exports.updateOrderService = async (req) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { id } = req.params;
        const filteredObj = filterRequest(req.body, "customerContact", "orderQuantity");
        console.log(filteredObj);
        if (filteredObj.orderQuantity != undefined) {
            const order = await Order.findById(id);
            const previousQuantity = order.orderQuantity;
        if (!filteredObj.orderQuantity) {
                if (!order) {
                    throw new BaseError("no such order found!", 404);
                }
                if (order.orderStatus === "placed") {
                    const updatedMilk = await updateMilkOrderService(filteredObj.orderQuantity, previousQuantity,id); // IMPLEMENT
                    console.log(updatedMilk);
                }
                else {
                    throw new BaseError(`Cannot update quantity as order is ${order.orderStatus} state!, 403`);
                }
            }
        }
        const updatedOrder = await Order.findByIdAndUpdate(id, filteredObj.customerContact, { new: true, runValidators: true });
        await session.commitTransaction();
        return updatedOrder;
    } catch (error) {
        await session.abortTransaction();
        console.log(error);
        throw new BaseError("Something went wrong", 500);
    }
}