import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const saveOrdersToJSON = (orders, filename = 'orders.json') => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = path.join(__dirname, '..', 'data', filename);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), 'utf-8');
  console.log(`Saved ${orders.length} orders to ${filePath}`);
};

export default saveOrdersToJSON;