const generateMarkdownTable = (data: any) => {
  const keys = Object.keys(data)

  const rowCount = Array.isArray(data[keys[0]]) ? data[keys[0]].length : 1

  const tableHeader = `| ${keys.join(' | ')} |`
  const tableSeparator = `|${keys.map(() => '------------------').join('|')}|`

  let rows = ''

  for (let i = 0; i < rowCount; i++) {
    const row = keys
      .map((key) => {
        const value = data[key]
        if (Array.isArray(value)) {
          return value[i] !== undefined ? value[i] : ''
        } else {
          return i === 0 ? value.toLocaleString() : ''
        }
      })
      .join(' | ')

    rows += `| ${row} |\n`
  }

  return `${tableHeader}\n${tableSeparator}\n${rows}`
}

export default generateMarkdownTable
