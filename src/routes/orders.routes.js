import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';

const router = Router();

// /api/orders or with query filtering (minWorth, maxWorth) /api/orders?minWorth=100&maxWorth=500
router.route('/orders')
  .get(OrdersController.getOrders);

