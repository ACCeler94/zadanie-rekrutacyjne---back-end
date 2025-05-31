import filterOrdersByWorth from '../utils/filterOrdersByWorth';
import getOrdersFromFile from '../utils/getOrdersFromFile';

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
  }
}


export default OrdersController;