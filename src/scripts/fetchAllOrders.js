import axios from 'axios';
import formatData from '../utils/formatData.js';
import saveOrdersToJSON from '../utils/saveOrdersToJSON.js';
import '../config/env.js';

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;


const fetchAllOrders = async () => {
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
          ordersBy: [{ elementName: 'id', direction: 'DESC' }]
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

  await saveOrdersToJSON(allOrders);
}

fetchAllOrders();