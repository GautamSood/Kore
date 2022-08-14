const Order = require('../models/order_Model');
const ErrorHandler = require("../util/errorhandler");
const CatchAsyncError = require("../middleware/catchAsyncError");
const { updateStatusService } = require("../service/updateStatus.service");
const { createOrderService } = require("../service/createOrderService.service");
const { deleteOrderService } = require("../service/deleteOrderService.service");
const { updateOrderService } = require("../service/updateOrderService.service");


/**
 * @swagger
 * tags:
 *      name: Order
 *      description: The order API endpoints
 */

//create Order

/**
 * @swagger
 * /add:
 *   post:
 *     parameters:
 *      - in: body
 *        name: order
 *        description: New order
 *        schema:
 *          type: object
 *          properties:
 *            orderStatus:
 *              type: string
 *            orderQuantity:
 *              type: number
 *            customerName:
 *              type: string
 *            customerContact:
 *              type: string
 *            customerEmail:
 *              type: string
 * 
 *     responses:
 *       201:
 *         description: created
 */

exports.createOrder = async (req, res) => {
  try {
    const createOrderReq = await createOrderService(req, res);
    return res.status(201).json({ status: "success", createOrderReq });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};



//get Order

/**
 * @swagger
 * /orders:
 *   get:
 *     description: All orders
 *     responses:
 *       200:
 *         description: Returns all the orders
 */
exports.getAllOrders = CatchAsyncError(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({
    status: "success",
    data: {
      products: orders,
    },
  });
});

//get order By id
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The orders ID.
 *     description: Get a orders by id
 *     responses:
 *       200:
 *         description: Returns the requested orders
 */
exports.getOrderDetails = CatchAsyncError( async(req, res, next) => {
    
      let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Product not found", 404));
  }
    res.status(200).json({
      status: "success",
      data: {
        order
      },
    });
    })
 

//update order -- Admin 
/**
 * @swagger
 * /update/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The order ID.
 *      - in: body
 *        name: order
 *        description: Update order contactNumber or Quantity
 *        schema:
 *          type: object
 *          properties:
 *            orderQuantity:
 *              type: number
  *            customerContact:
 *              type: string
 *            
 *     responses:
 *       200:
 *         description: updated
 */
exports.updateOrders = CatchAsyncError(async (req, res) => {
  const updatedOrder = await updateOrderService(req);
  return res.status(200).json({
    status: "success",
    data: {
      updatedOrder,
    },
  });
});

//update status

/**
 * @swagger
 * /updateStatus/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The order ID.
 *      - in: body
 *        name: orderStatus
 *        description: Update orderStatus
 *        schema:
 *          type: object
 *          properties:
 *              orderStatus:
 *                type: string
 *            
 *     responses:
 *       201:
 *         description: updated
 */
exports.updateStatus = CatchAsyncError(async (req, res) => {
  
    const updatedOrder = await updateStatusService(req);
    return res.status(201).json({
      status: "success",
      data: {
        updatedOrder,
      },
    });
  
});

// delete

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The order ID.
 *     description: Delete a order by id
 *     responses:
 *       200:
 *         description: order deleted
 */
exports.deleteOrders = CatchAsyncError(async (req, res, next) => {
  let {id} = req.params;

  await deleteOrderService(id);
  return res.status(200).json({
      status: "success",
      message: "order deleted"
    });
});



