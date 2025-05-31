import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const saveOrdersToJSON = async (orders, filename = 'orders.json', append = false) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = path.join(__dirname, '..', 'data', filename);

  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    if (append) {
      const existing = await fs.readFile(filePath, 'utf-8').catch(() => '[]');
      const existingOrders = JSON.parse(existing);
      const newOrders = [...existingOrders, ...orders];

      await fs.writeFile(filePath, JSON.stringify(newOrders, null, 2), 'utf-8');

      console.log(`Appended ${orders.length} orders to ${filePath}`);

    } else {
      await fs.writeFile(filePath, JSON.stringify(orders, null, 2), 'utf-8');

      console.log(`Saved ${orders.length} orders to ${filePath}`);
    }
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
};

export default saveOrdersToJSON;