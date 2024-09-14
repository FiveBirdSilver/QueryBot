import React, { KeyboardEvent, useState } from 'react'
import { styled } from 'styled-components'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IoArrowUpCircle } from 'react-icons/io5'
import TextareaAutosize from 'react-textarea-autosize'
import dayjs from 'dayjs'

interface InputProps {
  disabled?: boolean
  setState: React.Dispatch<
    React.SetStateAction<{ id: string; queries: string; answers: string }[]>
  >
}

const Input = (props: InputProps) => {
  const { disabled, setState } = props
  const nowTime = dayjs().format('YYYYMMDDhhmmss')
  const [value, setValue] = useState<string>('')

  const handleOnSubmit = () => {
    if (value.trim() === '') return null
    else {
      setState((prev) => [
        ...prev,
        {
          id: nowTime,
          queries: value,
          answers: '',
        },
      ])
      setValue('')
    }
  }

  const handleOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing) return

    if (event.code === 'Enter') {
      event.preventDefault()
      handleOnSubmit()
    }
  }

  return (
    <InputContainer>
      <FileUploadIcon />
      <InputSection>
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleOnKeyDown(e)}
          disabled={disabled}
          placeholder='질문하기'
        />
        <SubmitButton onClick={handleOnSubmit} />
      </InputSection>
    </InputContainer>
  )
}

export default Input

const InputContainer = styled.div`
  width: -webkit-fill-available;
  position: absolute;
  bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 20px 10px 20px;
`

const InputSection = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  background-color: #1e1f20;
  border-radius: 4px;
  padding: 5px 10px;
`

const TextInput = styled(TextareaAutosize)`
  width: -webkit-fill-available;
  outline: none;
  border: none !important;
  color: #cdced0 !important;
  resize: none;
  font-size: ${(props) => props.theme.fontSizes.md};
  max-height: 150px;
  background-color: transparent;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #444654 #1e1f20;

  &::placeholder {
    color: #cdced0;
  }
`

const FileUploadIcon = styled(AiOutlinePlusCircle)`
  color: #444654;
  font-size: 1.45rem;
  margin-top: 0.3rem;
  cursor: pointer;
`

const SubmitButton = styled(IoArrowUpCircle)`
  color: #4b89d4;
  font-size: 1.45rem;
  cursor: pointer;
`
