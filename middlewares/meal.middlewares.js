const { Meal } = require('../models/meal.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validExistMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { mealId } = req.body;

  const meal = await Meal.findOne({
    where: {
      id: id || mealId,
      status: true,
    },
  });
  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }
  req.meal = meal;

  next();
});
