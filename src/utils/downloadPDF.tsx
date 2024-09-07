const PdfDownload = async () => {
  const response = await fetch('/report.pdf')
  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'report.pdf')
  document.body.appendChild(link)
  link.click()

  // 링크 요소 제거 및 메모리 해제
  link.parentNode?.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export default PdfDownload
