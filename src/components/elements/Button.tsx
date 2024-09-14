import { styled } from 'styled-components'
import React from 'react'

interface ButtonProps {
  text: string
  status: 'primary' | 'cancel'
  onclick?: () => void
}

const Button = (props: ButtonProps) => {
  const { text, status, onclick } = props
  return (
    <StyledButton $status={status} onClick={onclick}>
      {text}
    </StyledButton>
  )
}
export default Button
const StyledButton = styled.button<{
  $status: 'primary' | 'cancel'
}>`
  font-size: ${(props) => props.theme.fontSizes.sm};
  background-color: ${(props) =>
    props.$status === 'primary'
      ? props.theme.color.blue_200
      : props.theme.color.white};
  color: ${(props) =>
    props.$status === 'primary'
      ? props.theme.color.white
      : props.theme.color.gray_400};
  border-radius: 4px;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
`
