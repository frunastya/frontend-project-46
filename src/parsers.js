import * as yaml from 'js-yaml';

const parse = (content, filepath) => {
  if (filepath.endsWith('.json')) {
    return JSON.parse(content);
  }
  if (filepath.endsWith('.yml') || filepath.endsWith('.yaml')) {
    return yaml.load(content);
  }
  throw new Error(`Unsupported file format: ${filepath}`);
};

export default parse;
