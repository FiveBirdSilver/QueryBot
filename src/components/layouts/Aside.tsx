import { styled } from 'styled-components'
import { FaRegSquarePlus, FaCircleQuestion } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { GrHistory } from 'react-icons/gr'

import useOpen from '../../hooks/useOpen'

interface AsideProps {
  onClick: () => void
}
const Aside = (props: AsideProps) => {
  const { onClick } = props
  const { condition } = useOpen()

  return (
    <AsideContainer $condition={condition}>
      <AsideWrapper>
        {condition === 'wide' ? (
          <>
            <StyleMenu onClick={onClick}>
              <FaRegSquarePlus />
              <p>New Chat</p>
            </StyleMenu>
            <StyleMenu>
              <GrHistory />
              <p>History</p>
              <StyleArrowIcons />
            </StyleMenu>
          </>
        ) : (
          <>
            <FaRegSquarePlus onClick={onClick} />
            <GrHistory />
          </>
        )}
      </AsideWrapper>
      <FaCircleQuestion color='#4B89D4' />
    </AsideContainer>
  )
}

export default Aside

const AsideContainer = styled.div<{ $condition: 'basic' | 'wide' }>`
  align-items: ${(props) => (props.$condition === 'wide' ? 'start' : 'center')};
  background-color: #1e1f20;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: #ffffff;
  font-size: 1rem;
  padding: ${(props) =>
    props.$condition === 'wide' ? '15px 20px' : '15px 10px'};
  border-bottom-left-radius: 1rem;

  svg {
    cursor: pointer;
    font-size: 14px;
  }
`

const AsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  align-items: center;
`

const StyleMenu = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  cursor: pointer;
  gap: 10px;
  align-items: center;

  p {
    font-size: 14px;
  }
`

const StyleArrowIcons = styled(IoIosArrowDown)`
  position: absolute;
  right: 0;
`
