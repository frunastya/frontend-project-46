import fs from 'fs'
import parse from './parsers.js'
import format from './formatters/index.js'

const isObject = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = [...new Set([...keys1, ...keys2])].sort()

  return allKeys.map((key) => {
    if (!(key in data1)) {
      return { key, type: 'added', value: data2[key] }
    }
    if (!(key in data2)) {
      return { key, type: 'removed', value: data1[key] }
    }
    if (isObject(data1[key]) && isObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: buildDiff(data1[key], data2[key]),
      }
    }
    if (data1[key] !== data2[key]) {
      return {
        key,
        type: 'changed',
        oldValue: data1[key],
        newValue: data2[key],
      }
    }
    return { key, type: 'unchanged', value: data1[key] }
  })
}

const genDiff = (file1, file2, formatName = 'stylish') => {
  const content1 = fs.readFileSync(file1, 'utf8')
  const content2 = fs.readFileSync(file2, 'utf8')

  const data1 = parse(content1, file1)
  const data2 = parse(content2, file2)

  const diff = buildDiff(data1, data2)

  return format(diff, formatName)
}

export default genDiff
