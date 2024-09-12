import React, { useEffect, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { MdOutlineFileDownload } from 'react-icons/md'
import { PiCopySimple } from 'react-icons/pi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { TbRefresh } from 'react-icons/tb'
import { IoMdCheckmark } from 'react-icons/io'
import Skeleton from '@/components/elements/Skeleton'
import Button from '@/components/elements/Button'
import copyToClipboard from '@/utils/copyToClipboard'
import MarkdownRenderer from '@/utils/markDownRender'
import { googleDescription, googleHelperIcon } from '@/utils/constants'
import useTypingAnimation from '@/hooks/useTypingAnimation'
import useDelayAction from '@/hooks/useDelayAction'

interface MessageProps {
  id?: string
  type: 'basic' | 'queries' | 'answers'
  text: string
  actionId?: string
  onCancel?: () => void
  onOk?: () => void
  setRegenerate?: React.Dispatch<React.SetStateAction<string | undefined>>
  children?: React.ReactNode
}

const Message = (props: MessageProps) => {
  const { id, type, text, actionId, onCancel, onOk, children } = props

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [source, setSource] = useState<string>('')

  const typingText = useTypingAnimation(text)

  const isReference = useMemo(() => {
    const result = typingText.split('reference_source_Url_')
    if (result.length === 0) return typingText
    else return result[0]
  }, [typingText])

  useEffect(() => {
    const tmpArray = typingText.split('\n')

    const result = tmpArray.find((msg) => msg.includes('reference_source_Url_'))

    const urlRegex = /["']([^"']+)["']/
    const tmp = result?.match(urlRegex)

    if (tmp) setSource(tmp[1])
  }, [typingText])

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

  useDelayAction(typingText, 2000, () => {
    if (type === 'answers') setIsCompleted(true)
  })

  return (
    <AssistantWrapper>
      {isLoading ? (
        <Skeleton />
      ) : text && text !== 'regenerate' ? (
        <>
          <AssistantTitle $type={type}>
            <AssistantIcons>
              <span>{type === 'queries' ? 'U' : 'G'}</span>
            </AssistantIcons>
            <span>{type !== 'queries' && 'Chatbot'}</span>
          </AssistantTitle>
          {type === 'answers' ? (
            <>
              <AssistantContent $type={type}>
                <MarkdownRenderer>{isReference}</MarkdownRenderer>
                {source && (
                  <SourceContainer>
                    <span>출처</span>
                    <SourceWrapper
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
                    </SourceWrapper>
                  </SourceContainer>
                )}
                {actionId && (
                  <ButtonContainer>
                    <Button
                      text={'건너뛰기'}
                      status={'cancel'}
                      onclick={onCancel}
                    />
                    <Button text={'확인'} status={'primary'} onclick={onOk} />
                  </ButtonContainer>
                )}
              </AssistantContent>
              {actionId === undefined && actionId !== '' && isCompleted && (
                <UtilityIconsContainer>
                  <UtilityIcons>
                    <TbRefresh />
                    <p>Regenerate Answer</p>
                  </UtilityIcons>
                  <UtilityIcons>
                    <a
                      href='https://chatbot-api-ver2-296869084219.asia-northeast3.run.app/images/ga4_report.pdf'
                      download='ga4_report.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <MdOutlineFileDownload />
                    </a>
                    {isCopied ? (
                      <IoMdCheckmark />
                    ) : (
                      <PiCopySimple onClick={handleOnCopy} />
                    )}
                    <FiMoreHorizontal />
                  </UtilityIcons>
                </UtilityIconsContainer>
              )}
            </>
          ) : (
            <AssistantContent $type={type}>
              {text}
              {children}
            </AssistantContent>
          )}
        </>
      ) : null}
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
  margin: 10px 0;
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
  //margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #444444;
  }
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

  strong {
    color: #ffffff !important;
  }

  table {
    width: 100%;
    border: 1px solid #444444;
    margin: 12px 0;
  }

  th,
  td {
    border: 1px solid #444444;
    padding: 4px;
    min-width: 40px;
  }

  img {
    width: -webkit-fill-available;
    max-width: 450px;
  }
`

const UtilityIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 40px;

  svg {
    color: #f5f5f5;
    cursor: pointer;
    font-size: 16px;
  }

  a {
    padding-top: 5px;
  }
`

const UtilityIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;

  p {
    color: #f5f5f5;
    font-size: 0.625rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`

const SourceContainer = styled.div`
  margin: 15px 0;
`

const SourceWrapper = styled.div`
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
    font-size: 0.725rem;
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
    font-size: 0.625rem;
  }
`

const SourceDescription = styled.span`
  font-size: 0.5rem;
`
