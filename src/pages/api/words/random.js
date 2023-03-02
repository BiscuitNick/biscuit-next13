import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'src/data/words');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  const jsonContent = JSON.parse(fileContents);

  const wordList = Object.keys(jsonContent);
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

  //Return the content of the data file in json format
  return res.status(200).json(randomWord);
}
