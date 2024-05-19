// pages/api/update-json.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface RequestBody {
  words: string[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { words } = req.body as RequestBody;
    const filePath = path.join(process.cwd(), 'api', 'deck.json');

    // Read the current contents of the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading JSON file' });
      }

      let jsonContent: string[];
      try {
        jsonContent = JSON.parse(data);
      } catch (parseErr) {
        return res.status(500).json({ error: 'Error parsing JSON file' });
      }

      // Add new words to the JSON content
      jsonContent = jsonContent.concat(words);

      // Write the updated content back to the JSON file
      fs.writeFile(filePath, JSON.stringify(jsonContent, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ error: 'Error writing to JSON file' });
        }

        res.status(200).json({ message: 'Words added successfully', data: jsonContent });
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
