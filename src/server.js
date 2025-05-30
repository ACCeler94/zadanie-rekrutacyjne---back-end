import express from 'express';
import 'dotenv/config'

const app = express();
const port = 8000;

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.use((err, req, res, _next) => {
  const message = err.message || 'Internal server error.';
  res.status(500).json({ message });
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});