import { Router } from 'express';
import OrdersController from '../controllers/orders.controller.js';

const router = Router();

// /api/orders or with query filtering (minWorth, maxWorth) /api/orders?minWorth=100&maxWorth=500
router.route('/orders')
  .get(OrdersController.getOrders);

// /api/orders.csv or with query filtering (minWorth, maxWorth) /api/orders.csv?minWorth=100&maxWorth=500
router.route('/orders.csv')
  .get(OrdersController.getOrdersCSV);

// /api/orders/:id
router.route('/orders/:id')
  .get(OrdersController.getOrderById);

export { router as orderRoutes };
