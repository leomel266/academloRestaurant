const { Router } = require('express');
const {
  findAllMeals,
  disableMeals,
  updateMeals,
  findMeals,
  newMeal,
} = require('../controllers/meals.controller');
const { protect } = require('../middlewares/auth.middlewares');
const { validExistMeal } = require('../middlewares/meal.middlewares');
const {
  validExistRestaurant,
} = require('../middlewares/restaurants.middlewares');
const {
  createMealsValidation,
  updateMealsValidation,
} = require('../middlewares/validation.middlewares');

const router = Router();

router.get('/', findAllMeals);

router.get('/:id', validExistMeal, findMeals);

router.use(protect);

router.post('/:id', createMealsValidation, validExistRestaurant, newMeal);

router.patch('/:id', updateMealsValidation, validExistMeal, updateMeals);

router.delete('/:id', validExistMeal, disableMeals);

module.exports = { mealRouter: router() };
