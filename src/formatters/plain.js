const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const formatPlain = (diff, parentPath = '') => {
  const lines = diff.flatMap((node) => {
    const fullPath = parentPath ? `${parentPath}.${node.key}` : node.key

    switch (node.type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`
      case 'removed':
        return `Property '${fullPath}' was removed`
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
      case 'nested':
        return formatPlain(node.children, fullPath)
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })

  return lines.join('\n')
}

export default formatPlain
