import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, '..', 'data', 'orders.json');

const getOrdersFromFile = async () => {
  const data = await fs.readFile(filePath, 'utf-8').catch(() => '[]');
  return JSON.parse(data);
};

export default getOrdersFromFile;