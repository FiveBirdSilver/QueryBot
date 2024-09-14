import React, { useCallback, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { MdOutlineFileDownload } from 'react-icons/md'
import { PiCopySimple } from 'react-icons/pi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { TbRefresh } from 'react-icons/tb'
import { IoMdCheckmark } from 'react-icons/io'

import Skeleton from '@/components/elements/Skeleton'
import copyToClipboard from '@/utils/copyToClipboard'
import MarkdownRenderer from '@/utils/markDownRender'
import { googleDescription, googleHelperIcon } from '@/utils/constants'
import useTypingAnimation from '@/hooks/useTypingAnimation'
import useDelayAction from '@/hooks/useDelayAction'

interface MessageProps {
  id?: string
  type: 'basic' | 'queries' | 'answers'
  text: string
  setRegenerate?: React.Dispatch<React.SetStateAction<string | undefined>>
  children?: React.ReactNode
}

const Message = (props: MessageProps) => {
  const { id, type, text, children } = props

  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const typingText = useTypingAnimation(text)

  const isReference = useMemo(() => {
    const result = typingText.split('reference_source_Url_')
    if (result.length === 0) return typingText
    else return result[0]
  }, [typingText])

  const source = useMemo(() => {
    const tmpArray = typingText.split('\n')
    const result = tmpArray.find((msg) => msg.includes('reference_source_Url_'))
    const urlRegex = /["']([^"']+)["']/
    const tmp = result?.match(urlRegex)
    return tmp ? tmp[1] : ''
  }, [typingText])

  // 로딩
  const isLoading = useMemo(() => {
    return type === 'answers' && typingText === ''
  }, [typingText, type])

  // 답변 복사
  const handleOnCopy = useCallback(() => {
    copyToClipboard(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [text])

  // 답변이 완전히 끝난 후 기타 아이콘 나타남
  useDelayAction(typingText, 1000, () => {
    if (type === 'answers') setIsCompleted(true)
  })

  return (
    <MessageContainer>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <MessageHeader $type={type}>
            <MessageIcons>
              <span>{type === 'queries' ? 'U' : 'G'}</span>
            </MessageIcons>
            <span>{type !== 'queries' && 'Chatbot'}</span>
          </MessageHeader>
          {type === 'answers' ? (
            <>
              <MessageContent $type={type} key={id}>
                <MarkdownRenderer>{isReference}</MarkdownRenderer>
                {source && (
                  <SourceBox>
                    <span>출처</span>
                    <SourceContent
                      onClick={() =>
                        window.open(
                          source?.slice(1).replace(/"\]$/, ''),
                          '_blank'
                        )
                      }
                    >
                      <SourceLink>
                        <img src={googleHelperIcon} alt={'google'} />
                        <p>{source?.slice(1).replace(/"\]$/, '')}</p>
                      </SourceLink>
                      <SourceDescription>{googleDescription}</SourceDescription>
                    </SourceContent>
                  </SourceBox>
                )}
              </MessageContent>
              {isCompleted && (
                <UtilityBox>
                  <UtilityItem>
                    <TbRefresh />
                    <p>Regenerate Answer</p>
                  </UtilityItem>
                  <UtilityItem>
                    <MdOutlineFileDownload />
                    {isCopied ? (
                      <IoMdCheckmark />
                    ) : (
                      <PiCopySimple onClick={handleOnCopy} />
                    )}
                    <FiMoreHorizontal />
                  </UtilityItem>
                </UtilityBox>
              )}
            </>
          ) : (
            <MessageContent $type={type}>
              {text}
              {children}
            </MessageContent>
          )}
        </>
      )}
    </MessageContainer>
  )
}

export default Message

const MessageContainer = styled.div`
  color: ${({ theme }) => theme.color.gray_400};
`

const MessageHeader = styled.div<{ $type: 'basic' | 'queries' | 'answers' }>`
  display: flex;
  justify-content: ${(props) =>
    props.$type === 'queries' ? 'flex-end' : 'flex-start'};
  align-items: center;
  margin: 10px 0;
  gap: 10px;

  span {
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: bold;
    color: ${({ theme }) => theme.color.white};
  }
`

const MessageIcons = styled.div`
  background-color: rgb(160, 195, 255);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${({ theme }) => theme.color.gray_400};
  }
`

const MessageContent = styled.div<{ $type: 'basic' | 'queries' | 'answers' }>`
  margin: ${(props) =>
    props.$type === 'queries' ? ' 0 35px 0 10px' : ' 0 10px 0 35px'} !important;
  padding: 8px 12px;
  font-size: ${(props) => props.theme.fontSizes.md};
  white-space: break-spaces;
  color: ${({ theme }) => theme.color.white};
  background-color: ${(props) =>
    props.$type === 'queries'
      ? props.theme.color.blue_100
      : props.theme.color.gray_500};
  border-top-right-radius: ${(props) =>
    props.$type === 'queries' ? 0 : '1rem'};
  border-top-left-radius: ${(props) =>
    props.$type === 'queries' ? '1rem' : 0};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  display: flex;
  flex-direction: column;

  strong {
    color: ${({ theme }) => theme.color.white};
  }

  table {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.color.gray_400};
    margin: 12px 0;
  }

  th,
  td {
    border: 1px solid ${({ theme }) => theme.color.gray_400};
    padding: 4px;
    min-width: 40px;
  }

  img {
    width: -webkit-fill-available;
    max-width: 450px;
  }
`

const UtilityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 40px;

  svg {
    color: ${({ theme }) => theme.color.white};
    cursor: pointer;
    font-size: 16px;
  }

  a {
    padding-top: 5px;
  }
`

const UtilityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;

  p {
    color: ${({ theme }) => theme.color.white};
    font-size: ${(props) => props.theme.fontSizes.xs};
  }
`

const SourceBox = styled.div`
  margin: 15px 0;
`

const SourceContent = styled.div`
  max-width: 181px;
  border: 1px solid gray;
  border-radius: 4px;
  margin-top: 5px;
  padding: 4px 8px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  cursor: pointer;

  span {
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
`
const SourceLink = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;

  img {
    width: 15px !important;
    height: 15px;
    border: 1px solid gray;
    border-radius: 50%;
    padding: 1px;
  }

  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
`

const SourceDescription = styled.span`
  font-size: 0.5rem;
`
