const PdfDownload = () => {
  // Public 폴더에 있는 PDF 파일 경로
  const fileUrl = '/ga4_chatbot_report.pdf'

  // 다운로드를 위한 링크 생성
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = 'ga4_chatbot_report.pdf' // download 속성 추가
  document.body.appendChild(link)
  link.click()

  // 링크 요소 제거
  document.body.removeChild(link)
}

export default PdfDownload
