const express = require("express");
const {
  getAllOrders,
  createOrder,
  updateOrders,
  deleteOrders,
  getOrderDetails,
  updateStatus
} = require("../controller/order_Controller");

const router = express.Router();

//get requests
router.route("/orders").get(getAllOrders);
router.route("/orders/:id").get(getOrderDetails);

//post requests
router.route("/add").post(createOrder);

//update requests
router.route("/update/:id").patch(updateOrders);
router.route("/updateStatus/:id").patch(updateStatus);

//delete requests
router.route("/delete/:id").delete(deleteOrders);

module.exports = router;
