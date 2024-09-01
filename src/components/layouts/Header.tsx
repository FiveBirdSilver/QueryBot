import { styled } from 'styled-components'
import { RiFullscreenFill, RiCloseLargeLine } from 'react-icons/ri'
import { FaMinus } from 'react-icons/fa6'
import useOpen from '../../hooks/useOpen'

const Header = () => {
  const { open, setOpen, condition, setCondition } = useOpen()

  return (
    <HeaderContainer>
      <HeaderTitle src='https://chatbot-api-ver2-296869084219.asia-northeast3.run.app/images/logo.png' />
      <HeaderIcons>
        {condition === 'wide' ? (
          <FaMinus onClick={() => setCondition('basic')} />
        ) : (
          <RiFullscreenFill onClick={() => setCondition('wide')} />
        )}
        <RiCloseLargeLine onClick={() => setOpen(!open)} />
      </HeaderIcons>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  color: #ffffff;
  background-color: #1e1f20;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: relative;
  z-index: 2;
`

const HeaderTitle = styled.img`
  width: 6rem !important;
  height: 1rem;
`

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  svg {
    cursor: pointer;
    font-size: 1rem;
    color: #ffffff;
  }
`
