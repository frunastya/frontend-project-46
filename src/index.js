import fs from 'fs'
import parse from './parsers.js'

const genDiff = (file1, file2) => {
  const content1 = fs.readFileSync(file1, 'utf8')
  const content2 = fs.readFileSync(file2, 'utf8')

  let data1 = parse(content1, file1)
  let data2 = parse(content2, file2)

  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = [...keys1, ...keys2]
  const uniqueKeys = new Set(allKeys)
  const sortedKeys = [...uniqueKeys].sort()

  const lines = []

 for (const key of sortedKeys) {
  if (!(key in data1)) {
    lines.push(`  + ${key}: ${data2[key]}`)
  } else if (!(key in data2)) {
    lines.push(`  - ${key}: ${data1[key]}`)
  } else if (data1[key] !== data2[key]) {
    lines.push(`  - ${key}: ${data1[key]}`)
    lines.push(`  + ${key}: ${data2[key]}`)
  } else {
    lines.push(`    ${key}: ${data1[key]}`)
  }
}

return `{\n${lines.join('\n')}\n}`;
}

export default genDiff
