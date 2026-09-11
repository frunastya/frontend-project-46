import { test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('should compare flat JSON files correctly', () => {
  const file1 = path.join(__dirname, '__fixtures__', 'file1.json');
  const file2 = path.join(__dirname, '__fixtures__', 'file2.json');
  const expectedPath = path.join(__dirname, '__fixtures__', 'expected.txt');

  const result = genDiff(file1, file2);
  const expected = fs.readFileSync(expectedPath, 'utf8');

  expect(result.trim()).toEqual(expected.trim());
});
