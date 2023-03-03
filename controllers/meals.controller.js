const { Meal } = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');

exports.newMeal = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const { name, price } = req.body;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Meals created successfully',
    newMeal,
  });
});

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const allMeals = await Meal.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Meals fetched successfully',
    allMeals,
  });
});

exports.findMeals = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: 'success',
    message: 'Meals was found successfully',
    meal,
  });
});

exports.updateMeals = catchAsync(async (req, res, next) => {
  const { meal } = req;

  const { name, price } = req.body;

  await meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'Meals updated successfully',
  });
});

exports.disableMeals = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'inactive' });

  res.status(200).json({
    status: 'success',
    message: 'Meal disable successfully',
  });
});
