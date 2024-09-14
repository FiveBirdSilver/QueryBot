import { styled } from 'styled-components'
import { RiFullscreenFill } from 'react-icons/ri'

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle src='/logo.webp' />
      <RiFullscreenFill />
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.gray_500};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: relative;
  z-index: 2;
`

const HeaderTitle = styled.img`
  width: 6rem !important;
  height: 1rem;
`
