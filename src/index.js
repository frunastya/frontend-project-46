import fs from 'fs'
import * as  yaml from 'js-yaml'

const genDiff = (file1, file2, format) => {
  const content1 = fs.readFileSync(file1, 'utf8')
  const content2 = fs.readFileSync(file2, 'utf8')

  let data1
  let data2

  if (file1.endsWith('.json')) {
    data1 = JSON.parse(content1)
  } else if (file1.endsWith('.yml') || file1.endsWith('.yaml')) {
    data1 = yaml.load(content1)
  } else {
    throw new Error(`Unsupported file format: ${file1}`)
  }

  if (file2.endsWith('.json')) {
    data2 = JSON.parse(content2)
  } else if (file2.endsWith('.yml') || file2.endsWith('.yaml')) {
    data2 = yaml.load(content2)
  } else {
    throw new Error(`Unsupported file format: ${file2}`)
  }

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
