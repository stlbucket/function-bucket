import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// RURU
const ruru = async () => {
  await fs.cp(
    path.join(__dirname, 'node_modules/ruru/bundle'),
    path.join(__dirname, '.output/server/node_modules/ruru/bundle'),
    { recursive: true },
  );
};

await ruru();
