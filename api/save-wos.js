import { writeFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const data = req.body;

  try {
    const filePath = path.join(process.cwd(), 'public', 'wos-data.json');
    await writeFile(filePath, JSON.stringify(data, null, 2));
    return res.status(200).json({ message: 'Saved' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to write file' });
  }
}
