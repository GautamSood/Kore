const { getCapacityService } = require("../service/getCapacityService.service");
const catchAsyncError = require("../middleware/catchAsyncError");

/**
 * @swagger
 * tags:
 *      name: Milk
 *      description: The milk API endpoints
 */

/**
 * @swagger
 * /checkCapacity/{date}:
 *   get:
 *     tags : [Milk]
 *     parameters:
 *      - in: path
 *        name: date
 *        required: true
 *        type: string
 *        description: The date for which record is required (in milliseconds).
 *     description: Gets the document matching given date(in milliseconds).
 *     responses:
 *       200:
 *         description: Returns the requested document
 */
exports.getCapacity = catchAsyncError(async (req, res) => {
  const capacity = await getCapacityService(req);
  return res.status(200).json({
    status: "success",
    data: {
      capacity,
    },
  });
});
