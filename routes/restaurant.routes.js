const { Router } = require('express');
const {
  createRestaurant,
  newReview,
  findRestaurant,
  findAllRestaurants,
  updateReview,
  updateRestaurant,
  deleteReview,
  deleteRestaurant,
} = require('../controllers/restaurants.controller');

const { protect } = require('../middlewares/auth.middleware');
const {
  createRestaurantValidation,
  createReviewValidation,
  updateReviewValidation,
  updateRestaurantValidation,
} = require('../middlewares/valitation.middleware');

const router = Router();

router.get('/', findAllRestaurants);

router.get('/:id', findRestaurant);

router.use(protect);

router.post('/', createRestaurantValidation, createRestaurant);

router.post('/reviews/:id', createReviewValidation, newReview);

router.patch(
  '/reviews/:restaurantId/:id',
  updateReviewValidation,
  updateReview
);

router.delete('/reviews/:restaurantId/:id', deleteReview);

router.patch('/:id', updateRestaurantValidation, updateRestaurant);

router.delete('/:id', deleteRestaurant);

module.exports = { restaurantRouter: router() };
