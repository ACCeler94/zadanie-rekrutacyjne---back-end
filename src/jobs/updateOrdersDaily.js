import { endOfYesterday, format, startOfYesterday } from 'date-fns';
import cron from 'node-cron';
import fetchOrdersByDate from '../utils/fetchOrdersByDate.js';
import saveOrdersToJSON from '../utils/saveOrdersToJSON.js';


const updateOrdersDaily = () => {
  // Scheduled to run every day at 00:00
  cron.schedule('0 0 * * *', async () => {
    try {
      const startDate = format(startOfYesterday(), 'yyyy-MM-dd HH:mm:ss');
      const endDate = format(endOfYesterday(), 'yyyy-MM-dd HH:mm:ss');

      const orderData = await fetchOrdersByDate(startDate, endDate);
      await saveOrdersToJSON(orderData, 'orders.json', true);

      console.log('Daily orders updated successfully');
    } catch (error) {
      console.error('Failed to update daily orders:', error);
    }
  });
};

export default updateOrdersDaily;