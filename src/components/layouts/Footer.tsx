import { styled } from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        Assistant can make mistakes. Please verify important information.
      </FooterText>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  font-size: ${(props) => props.theme.fontSizes.xs};
  z-index: 1;
  background-color: ${({ theme }) => theme.color.black};
  width: 100%;
  text-align: center;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  margin: auto;
  padding-bottom: 6px;
  color: ${({ theme }) => theme.color.gray_300};
`

const FooterText = styled.p`
  padding-left: 1rem;
`
