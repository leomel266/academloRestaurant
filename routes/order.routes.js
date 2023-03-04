const { Router } = require('express');
const {
  newOrder,
  allOrderUser,
  completedOrder,
  cancelledOrder,
} = require('../controllers/order.controller');
const { protect } = require('../middlewares/auth.middlewares');
const { validExistMeal } = require('../middlewares/meal.middlewares');
const {
  createOrderValidation,
} = require('../middlewares/validation.middlewares');

const router = Router();

router.use(protect);

router.post('/', createOrderValidation, validExistMeal, newOrder);

router.get('/me', allOrderUser);

router.patch('/:id', completedOrder);

router.delete('/:id', cancelledOrder);

module.exports = {
  orderRouter: router,
};
