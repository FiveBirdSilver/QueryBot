import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { MdOutlineFileDownload } from 'react-icons/md'
import { PiCopySimple } from 'react-icons/pi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { TbRefresh } from 'react-icons/tb'
import { IoMdCheckmark } from 'react-icons/io'

import Skeleton from 'components/elements/Skeleton'
import copyToClipboard from 'utils/copyToClipboard'
import MarkdownRenderer from 'utils/markDownRender'
import useTypingAnimation from 'hooks/useTypingAnimation'

interface MessageProps {
  type: 'basic' | 'queries' | 'answers'
  text: string
  children?: React.ReactNode
}

const Message = (props: MessageProps) => {
  const { type, text, children } = props
  const typingText = useTypingAnimation(text)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  useEffect(() => {
    if (type === 'basic' || type === 'queries') {
      setIsLoading(false)
    }
    if (type === 'answers' && typingText !== '') {
      setIsLoading(false)
    }
  }, [typingText, type])

  // 답변 복사
  const handleOnCopy = () => {
    copyToClipboard(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <AssistantWrapper>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <AssistantTitle $type={type}>
            <AssistantIcons>{type === 'queries' ? 'U' : 'G'}</AssistantIcons>
            <span>{type !== 'queries' && 'GenAIon Chatbot'}</span>
          </AssistantTitle>
          {type === 'answers' ? (
            <>
              <MarkdownRenderer>{typingText}</MarkdownRenderer>
              <UtilityIconsContainer>
                <UtilityIcons>
                  <TbRefresh />
                  <span>Regenerate Answer</span>
                </UtilityIcons>
                <UtilityIcons>
                  <MdOutlineFileDownload />
                  {isCopied ? (
                    <IoMdCheckmark />
                  ) : (
                    <PiCopySimple onClick={handleOnCopy} />
                  )}
                  <FiMoreHorizontal />
                </UtilityIcons>
              </UtilityIconsContainer>
            </>
          ) : (
            <AssistantContent $type={type}>
              {text}
              {children}
            </AssistantContent>
          )}
        </>
      )}
    </AssistantWrapper>
  )
}

export default Message

const AssistantWrapper = styled.div`
  color: #444444;
`

const AssistantTitle = styled.div<{ $type: 'basic' | 'queries' | 'answers' }>`
  display: flex;
  justify-content: ${(props) =>
    props.$type === 'queries' ? 'flex-end' : 'flex-start'};
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;

  span {
    font-size: 0.825rem;
    font-weight: bold;
    color: #fff;
  }
`

const AssistantIcons = styled.div`
  background-color: rgb(160, 195, 255);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AssistantContent = styled.div<{ $type: 'basic' | 'queries' | 'answers' }>`
  margin: ${(props) =>
    props.$type === 'queries' ? ' 0 35px 0 10px' : ' 0 10px 0 35px'} !important;
  padding: 8px 12px;
  font-size: 0.765rem;
  white-space: break-spaces;
  color: #f5f5f5;
  background-color: ${(props) =>
    props.$type === 'queries' ? '#4B89D4' : '#1E1F20'};
  border-top-right-radius: ${(props) =>
    props.$type === 'queries' ? 0 : '1rem'};
  border-top-left-radius: ${(props) =>
    props.$type === 'queries' ? '1rem' : 0};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  display: flex;
  flex-direction: column;
`

const UtilityIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 0 40px;
`

const UtilityIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;

  svg {
    color: #f5f5f5;
    cursor: pointer;
  }
  span {
    color: #f5f5f5;
    font-size: 0.575rem;
  }
`
