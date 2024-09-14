const button = document.createElement('button')
button.style.position = 'fixed'
button.style.bottom = '20px'
button.style.right = '20px'
button.style.backgroundColor = 'white' // 배경색을 흰색으로 설정
button.style.border = 'none'
button.style.borderRadius = '5px'
button.style.cursor = 'pointer'
button.style.zIndex = '1000'
button.style.width = '35px'
button.style.height = '35px'
button.style.display = 'flex'
button.style.alignItems = 'center'
button.style.justifyContent = 'center'
button.style.fontSize = '18px'
button.style.fontWeight = 'bold'
button.style.color = 'black' // 텍스트 색상

button.textContent = 'G'

document.body.appendChild(button)

button.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'open_side_panel' })
})

export {}
