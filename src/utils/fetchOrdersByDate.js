import axios from 'axios';
import formatData from './formatData.js';
import '../config/env.js';

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;


// Date format: '2025-04-08 23:59:59'
const fetchOrdersByDate = async (startDate, endDate) => {
  const allOrders = [];
  const limit = 100;
  let page = 0;
  let totalPages = 1;

  while (page < totalPages) {
    try {
      const response = await axios.post(`${API_URL}/search`, {
        params: {
          resultsLimit: limit,
          resultsPage: page,
          ordersRange: {
            ordersDateRange: {
              ordersDateType: 'add',
              ordersDateBegin: startDate,
              ordersDateEnd: endDate
            }
          }
        }
      }, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'X-API-KEY': API_KEY
        }
      });

      const { Results, resultsNumberPage, resultsPage } = response.data;
      page = resultsPage + 1;
      totalPages = resultsNumberPage;
      const formattedData = formatData(Results)

      allOrders.push(...formattedData);
    } catch (err) {
      console.error(`Error on page ${page}:`, err.message);
      break;
    }
  }
  return allOrders;
}

export default fetchOrdersByDate;