import formatStylish from './stylish.js'
import formatPlain from './plain.js'
import formatJson from './json.js'

const format = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return formatPlain(diff)
    case 'stylish':
      return formatStylish(diff)
    case 'json':
      return formatJson(diff)
    default:
      throw new Error(`Unknown format: ${formatName}`)
  }
}

export default format
