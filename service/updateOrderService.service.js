const Order = require("../models/order_Model");
const Milk = require("../models/milk_Model");
const mongoose = require("mongoose");
const { startOfToday, endOfToday } = require("date-fns");
const { updateMilkOrderService } = require("../service/updateMilkOrderService.service")
const ErrorHandler = require("../util/errorhandler");


const filterRequest = (obj, ...allowedFields) => {
  let newObject = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObject[el] = obj[el]; //add desired fields to new obj
    }
  });
  return newObject;
};



exports.updateOrderService = async (req) => {
    const session = await mongoose.startSession();
    try {

        const { id } = req.params;
        const filteredObj = filterRequest(req.body, "customerContact", "orderQuantity");
        console.log(filteredObj);
        if (filteredObj.orderQuantity != undefined) {
            const order = await Order.findById(id);
            const previousQuantity = order.orderQuantity;
        
                if (!order) {
                    throw new ErrorHandler("no such order found!", 404);
                }
                if (order.orderStatus === "placed") {
                    const updatedMilk = await updateMilkOrderService(filteredObj.orderQuantity, previousQuantity,id); // IMPLEMENT
                    console.log(updatedMilk);
                }
                else {
                    throw new ErrorHandler(
                      `Cannot update quantity as order is ${order.orderStatus} state!, 403`
                    );
                }
            
        }
        const updatedOrder = await Order.findByIdAndUpdate(id, filteredObj.customerContact, { new: true, runValidators: true });

        return updatedOrder;
    } catch (error) {

        console.log(error);
        throw new ErrorHandler("Something went wrong", 500);
    }
}