import express from 'express';
import './config/env.js';
import updateOrdersDaily from './jobs/updateOrdersDaily.js';
import { orderRoutes } from './routes/orders.routes.js';
import timeout from 'connect-timeout';


const app = express();
const port = 8000;

// Global timeout middleware
app.use(timeout('20s'));

// Handle timeout error
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use('/api', orderRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

app.use((err, req, res, _next) => {
  const message = err.message || 'Internal server error.';
  res.status(500).json({ error: message });
});

// Create crone-job to update orders daily
updateOrdersDaily()

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
