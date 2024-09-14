import React from 'react'
import styled from 'styled-components'

import { SelectManual } from '@/utils/constants'
import useViewPort from '@/hooks/useViewPort'

interface CardProps {
  active: string
  setActive: React.Dispatch<React.SetStateAction<string>>
  disabled?: boolean
}

const Card = (props: CardProps) => {
  const { active, setActive, disabled } = props
  const { condition } = useViewPort()

  return (
    <StyledCardContainer $condition={condition === 'wide' ? 'wide' : 'basic'}>
      {SelectManual.map((v) => (
        <StyledCard
          key={v.id}
          $status={active === v.id ? 'active' : 'inactive'}
          $disabled={disabled ? 'disabled' : 'enabled'}
          onClick={() => setActive(v.id)}
        >
          <StyledCardContent>
            <StyledCardTitle $status={active === v.id ? 'active' : 'inactive'}>
              {v.title}
            </StyledCardTitle>
            <StyledCardDescription
              $status={active === v.id ? 'active' : 'inactive'}
            >
              {v.content}
            </StyledCardDescription>
          </StyledCardContent>
        </StyledCard>
      ))}
    </StyledCardContainer>
  )
}

export default Card

const StyledCardContainer = styled.div<{ $condition: 'basic' | 'wide' }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$condition === 'wide' ? '1fr 1fr 1fr' : 'auto'};
  padding-top: 12px;
  gap: 10px;
`

const StyledCard = styled.div<{
  $status: 'active' | 'inactive'
  $disabled: 'disabled' | 'enabled'
}>`
  display: flex;
  border-radius: 4px;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  cursor: pointer;
  color: ${(props) => props.theme.color.black};
  background-color: ${(props) =>
    props.$status === 'active'
      ? props.theme.color.skyblue
      : props.theme.color.gray_300};
  pointer-events: ${(props) =>
    props.$disabled === 'disabled' ? 'none' : 'all'};
`

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const StyledCardTitle = styled.p<{ $status: 'active' | 'inactive' }>`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: bold;
  color: ${(props) =>
    props.$status === 'active'
      ? props.theme.color.gray_500
      : props.theme.color.white};
`

const StyledCardDescription = styled.p<{ $status: 'active' | 'inactive' }>`
  font-size: ${(props) => props.theme.fontSizes.sm};
  text-align: justify;
  color: ${(props) =>
    props.$status === 'active'
      ? props.theme.color.gray_500
      : props.theme.color.gray_200};
`
