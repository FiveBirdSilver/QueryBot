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
  font-size: 0.725rem;
  background-color: ${(props) =>
    props.$status === 'primary' ? '#417DF7' : '#FFFFFF'};
  color: ${(props) => (props.$status === 'primary' ? '#FFFFFF' : '#444444')};
  border-radius: 4px;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
`
