const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const morgan = require('morgan');
const glabalErrorHandler = require('../controllers/error.controller');
const initModel = require('./initModel');
const { usersRouter } = require('../routes/users.routes');
const { authRouter } = require('../routes/auth.routes');
const { restaurantRouter } = require('../routes/restaurant.routes');
const { mealRouter } = require('../routes/meal.routes');
const { orderRouter } = require('../routes/order.routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.path = {
      user: '/api/v1/users',
      restaurant: '/api/v1/restaurants',
      auth: '/api/v1/auth',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
    };
    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      console.log('Hola, estoy en desarrollo');
      this.app.use(morgan('dev'));
    }

    if (process.env.NODE_ENV === 'production') {
      console.log('Hola, estoy en produccion');
    }
    // Utilizamos las cors para permitir el acceso a la api
    this.app.use(cors());

    // Utilizamos express.json para parsear el body de la request
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.path.user, usersRouter);
    this.app.use(this.path.auth, authRouter);
    this.app.use(this.path.restaurant, restaurantRouter);
    this.app.use(this.path.meal, mealRouter);
    this.app.use(this.path.order, orderRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(glabalErrorHandler);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  database() {
    db.authenticate()
      .then(() => {
        console.log('Database authenticated');
      })
      .catch(err => console.log(err));

    // Relations
    initModel();

    db.sync()
      .then(() => {
        console.log('Database sycend');
      })
      .catch(err => console.log(err));
  }
}

module.exports = Server;
