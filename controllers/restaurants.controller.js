const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');
const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({ name, address, rating });

  res.status(201).json({
    status: 'success',
    message: 'Restaurant created successfully',
    newRestaurant,
  });
});

exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Restaurats fetched successfully',
    restaurants,
  });
});

exports.findRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Restaurat fetched successfully',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;

  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  await restaurant.update({
    name,
    address,
  });

  res.status(200).json({
    status: 'success',
    message: 'Update restaurant successfully',
    restaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  await restaurant.update({ status: 'inactive' });

  res.status(200).json({
    status: 'success',
    message: 'Delete restaurant successfully',
  });
});

exports.newReview = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const { id } = req.params;

  const { comment, rating } = req.body;

  const review = await Review.create({
    restaurantId: id,
    userId: sessionUser.id,
    comment,
    rating,
  });

  res.status(201).json({
    status: 'success',
    message: 'review created successfully',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const { restaurantId, id } = req.params;

  const { comment, rating } = req.body;

  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
      userId: sessionUser.id,
    },
  });

  const updateOneReview = await review.update({
    comment,
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'the review update successfully',
    updateOneReview,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const { restaurantId, id } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
      userId: sessionUser.id,
    },
  });

  await review.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
    message: 'the review deleted successfully',
  });
});
