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

  const handleClick = (value: string) => {
    setActive(value)
  }

  return (
    <>
      {data.length > 0 && (
        <LabelContainer>
          {data.map((v) => (
            <LabelWrapper
              key={v.id}
              $status={active === v.id ? 'active' : 'inactive'}
              $disabled={disabled ? 'disabled' : 'enabled'}
              onClick={() => handleClick(v.id)}
            >
              {v.value}
            </LabelWrapper>
          ))}
        </LabelContainer>
      )}
    </>
  )
}

export default Label

const LabelContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  padding-top: 8px;
  gap: 5px;
`

const LabelWrapper = styled.div<{
  $status: 'active' | 'inactive'
  $disabled: 'disabled' | 'enabled'
}>`
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  font-size: 0.725rem;
  width: max-content;
  color: #1e1f20;
  background-color: ${(props) =>
    props.$status === 'active' ? '#C3D9FF' : '#f3f3f5'};
  pointer-events: ${(props) =>
    props.$disabled === 'disabled' ? 'none' : 'all'};
`
