const getIndent = (depth) => '    '.repeat(depth)

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return String(value)
  }

  const entries = Object.entries(value)
  const lines = entries.map(([key, val]) => {
    return `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  })

  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`
}

const formatStylish = (diff) => {
  const render = (nodes, depth) => {
    return nodes.map((item) => {
      const indent = getIndent(depth)
      const innerIndent = getIndent(depth + 1)

      switch (item.type) {
        case 'added':
          return `${indent}  + ${item.key}: ${stringify(item.value, depth + 1)}`
        case 'removed':
          return `${indent}  - ${item.key}: ${stringify(item.value, depth + 1)}`
        case 'changed':
          return `${indent}  - ${item.key}: ${stringify(item.oldValue, depth + 1)}\n${indent}  + ${item.key}: ${stringify(item.newValue, depth + 1)}`
        case 'unchanged':
          return `${indent}    ${item.key}: ${stringify(item.value, depth + 1)}`
        case 'nested':
          return `${indent}    ${item.key}: {\n${render(item.children, depth + 1)}\n${innerIndent}}`
        default:
          throw new Error(`Unknown type: ${item.type}`)
      }
    }).join('\n')
  }

  return `{\n${render(diff, 0)}\n}`
}

export default formatStylish
