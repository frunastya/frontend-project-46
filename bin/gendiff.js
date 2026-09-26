#!/usr/bin/env node

import { program } from 'commander'
import genDiff from '../src/index.js'

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<file1>')
  .argument('<file2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((file1, file2, options) => {
    const result = genDiff(file1, file2, options.format);
    console.log(result);
  });

program.parse();
