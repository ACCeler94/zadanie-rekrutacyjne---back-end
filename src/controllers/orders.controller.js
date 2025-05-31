import filterOrdersByWorth from '../utils/filterOrdersByWorth.js';
import getOrdersFromFile from '../utils/getOrdersFromFile.js';
import { json2csv } from 'json-2-csv';


const OrdersController = {
  getOrders: async (req, res, next) => {
    try {
      const orderData = await getOrdersFromFile();

      if (!orderData || orderData.length === 0) {
        return res.status(404).json({ error: 'No orders found' });
      }

      const allowedQueries = ['minWorth', 'maxWorth'];
      const queryKeys = Object.keys(req.query);

      const unknownParams = queryKeys.filter(key => !allowedQueries.includes(key));
      if (unknownParams.length > 0) {
        return res.status(400).json({
          error: `Unknown query parameters: ${unknownParams.join(', ')}. Only 'minWorth' and 'maxWorth' are allowed.`
        });
      }

      const { minWorth, maxWorth } = req.query;
      // If both queries are present, filter
      if (minWorth && maxWorth) {
        const filteredOrders = filterOrdersByWorth(orderData, { minWorth, maxWorth })

        return res.status(200).json({ data: filteredOrders });
      }

      // If queries not present return all
      return res.status(200).json({ data: orderData });

    } catch (error) {
      next(error);
    }
  },

  getOrdersCSV: async (req, res, next) => {
    try {
      const orderData = await getOrdersFromFile();

      if (!orderData || orderData.length === 0) {
        return res.status(404).json({ error: 'No orders found' });
      }

      const allowedQueries = ['minWorth', 'maxWorth'];
      const queryKeys = Object.keys(req.query);

      const unknownParams = queryKeys.filter(key => !allowedQueries.includes(key));
      if (unknownParams.length > 0) {
        return res.status(400).json({
          error: `Unknown query parameters: ${unknownParams.join(', ')}. Only 'minWorth' and 'maxWorth' are allowed.`
        });
      }

      const { minWorth, maxWorth } = req.query;

      // Filter orders if minWorth and maxWorth present, if not - use all orders
      const filteredOrders = (minWorth && maxWorth)
        ? filterOrdersByWorth(orderData, { minWorth, maxWorth })
        : orderData;

      // Convert filteredOrders to CSV string
      const csvData = await json2csv(filteredOrders);

      // Send csv data for download
      res.status(200)
        .header('Content-Type', 'text/csv')
        .attachment('orders.csv')
        .send(csvData);

    } catch (error) {
      next(error);
    }
  },

  getOrderById: async (req, res, next) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: 'Missing order id.' })
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) return res.status(400).json({ error: 'Invalid id. Id must be a number.' })

    try {
      const orderData = await getOrdersFromFile();

      if (!orderData || orderData.length === 0) {
        return res.status(404).json({ error: 'No orders found' });
      }

      const order = orderData.find(o => o.orderID === parsedId)

      if (!order) return res.status(404).json({ error: 'No order with this id was found.' });

      return res.status(200).json(order)
    } catch (error) {
      next(error)
    }
  }
}


export default OrdersController;