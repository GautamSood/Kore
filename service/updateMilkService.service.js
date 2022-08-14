const Milk = require("../models/milk_Model");

exports.updateMilkService = async (orderQuantity, id) => {
  try {
    const milk = await Milk.findById(id);
    if (milk.capacity < orderQuantity) {
      throw new Error("not enough milk!");
    }
    const capacity = {
      capacity: milk.capacity - orderQuantity,
    };
    const updatedMilk = await Milk.findByIdAndUpdate(id, capacity, {
      new: true,
      runValidators: true,
    });
    return updatedMilk;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};