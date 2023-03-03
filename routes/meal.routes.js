const { Router } = require('express');
const {
  findAllMeals,
  disableMeals,
  updateMeals,
  findMeals,
  newMeals,
} = require('../controllers/meals.controller');
const { protect } = require('../middlewares/auth.middlewares');
const { validExistMeals } = require('../middlewares/meal.middlewares');
const {
  validExistRestaurant,
} = require('../middlewares/restaurants.middlewares');
const {
  createMealsValidation,
  updateMealsValidation,
} = require('../middlewares/validation.middlewares');

const router = Router();

router.get('/', findAllMeals);

router.get('/:id', validExistMeals, findMeals);

router.use(protect);

router.post('/:id', createMealsValidation, validExistRestaurant, newMeals);

router.patch('/:id', updateMealsValidation, validExistMeals, updateMeals);

router.delete('/:id', validExistMeals, disableMeals);

module.exports = { mealRouter: router() };
