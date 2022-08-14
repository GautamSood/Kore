const Milk = require("../models/milk_Model");

exports.createMilkService = async (session) => {
  try {
    const dailyMilk = await Milk.create({ session });
    return dailyMilk;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
