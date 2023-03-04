const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');

exports.newOrder = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;

  const { meal, sessionUser } = req;

  const order = await Order.create({
    quantity,
    mealId: meal.id,
    userId: sessionUser.id,
    totalPrice: meal.price * quantity,
  });

  res.status(201).json({
    status: 'success',
    message: 'Order create successfully',
    order,
  });
});

exports.allOrderUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const allOrder = await Order.findAll({
    where: {
      userId: sessionUser.id,
    },
    include: [
      {
        model: Meal,
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
        include: [
          {
            model: Restaurant,
            attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'all Order find successfully',
    allOrder,
  });
});

exports.completedOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'Order completed successfully',
  });
});

exports.cancelledOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Orders.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  await order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'Order cancelled successfully',
  });
});
