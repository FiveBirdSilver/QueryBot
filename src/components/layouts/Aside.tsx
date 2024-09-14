import { styled } from 'styled-components'
import { FaRegSquarePlus, FaCircleQuestion } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { GrHistory } from 'react-icons/gr'

import useViewPort from '@/hooks/useViewPort'

interface AsideProps {
  onClick: () => void
}

const Aside = (props: AsideProps) => {
  const { onClick } = props
  const { condition } = useViewPort()

  return (
    <AsideContainer $condition={condition === 'wide' ? 'wide' : 'basic'}>
      {condition === 'wide' ? (
        <MenuList>
          <MenuItem onClick={onClick}>
            <FaRegSquarePlus />
            <MenuItemText>New Chat</MenuItemText>
          </MenuItem>
          <MenuItem>
            <GrHistory />
            <MenuItemText>History</MenuItemText>
            <ArrowIcon />
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList>
          <FaRegSquarePlus onClick={onClick} />
          <GrHistory />
        </MenuList>
      )}
      <HelpIcon />
    </AsideContainer>
  )
}

export default Aside

const AsideContainer = styled.div<{ $condition: 'basic' | 'wide' }>`
  align-items: ${(props) => (props.$condition === 'wide' ? 'start' : 'center')};
  background-color: ${(props) => props.theme.color.gray_500};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: ${({ theme }) => theme.color.white};
  font-size: ${(props) => props.theme.fontSizes.xxl};
  padding: ${(props) =>
    props.$condition === 'wide' ? '15px 20px' : '15px 10px'};
  border-bottom-left-radius: 1rem;
  min-width: 30px;
  z-index: 2;
  svg {
    cursor: pointer;
    font-size: 14px;
  }
`

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  align-items: center;
`

const MenuItem = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  cursor: pointer;
  gap: 10px;
  align-items: center;
  min-width: 100px;
`

const MenuItemText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xl};
`

const ArrowIcon = styled(IoIosArrowDown)`
  position: absolute;
  right: 0;
`

const HelpIcon = styled(FaCircleQuestion)`
  color: ${(props) => props.theme.color.blue_100};
`
