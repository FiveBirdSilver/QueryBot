const filterIndexId = (id: string) => {
  if (id) {
    const tmpSplit = id.split('_')
    if (tmpSplit.length > 1) return id
    else return `${id}_0`
  }
}

export default filterIndexId
