import ReactDOM from 'react-dom'
import { useRef, useEffect } from 'react'
import styled from 'styled-components'

import Popup from './popup'
import useOpen from './hooks/useOpen'

const App = () => {
  const { open, setOpen } = useOpen()
  const portalTargetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    portalTargetRef.current = document.getElementById(
      'gen_AIon_root'
    ) as HTMLDivElement
  }, [])

  return (
    <>
      <Button onClick={() => setOpen(!open)}>G</Button>
      {open &&
        portalTargetRef.current &&
        ReactDOM.createPortal(<Popup />, portalTargetRef.current)}
    </>
  )
}

export default App

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  width: 35px;
  height: 35px;
  background-color: #ffffff;
  color: #444444;
  border: 1px solid #ececec;
  font-size: 1.5rem;
  font-family: Pretendard-R sans-serif;
  font-weight: bold;
`
