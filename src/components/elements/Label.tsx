import React from 'react'
import { styled } from 'styled-components'

interface CardProps {
  data: {
    id: string
    value: string
    text: string
  }[]
  active: string
  setActive: React.Dispatch<React.SetStateAction<string>>
  disabled: boolean
}

const Label = (props: CardProps) => {
  const { data, active, setActive, disabled } = props

  const handleOnClick = (value: string) => {
    setActive(value)
  }

  return (
    <>
      {data.length > 0 && (
        <StyledLabelContainer>
          {data.map((v) => (
            <StyledLabel
              key={v.id}
              $status={active === v.id ? 'active' : 'inactive'}
              $disabled={disabled ? 'disabled' : 'enabled'}
              onClick={() => handleOnClick(v.id)}
            >
              {v.value}
            </StyledLabel>
          ))}
        </StyledLabelContainer>
      )}
    </>
  )
}

export default Label

const StyledLabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;
  gap: 5px;
`

const StyledLabel = styled.div<{
  $status: 'active' | 'inactive'
  $disabled: 'disabled' | 'enabled'
}>`
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes.sm};
  width: max-content;
  color: ${({ theme }) => theme.color.black};
  background-color: ${(props) =>
    props.$status === 'active'
      ? props.theme.color.skyblue
      : props.theme.color.sand};
  pointer-events: ${(props) =>
    props.$disabled === 'disabled' ? 'none' : 'all'};
`
