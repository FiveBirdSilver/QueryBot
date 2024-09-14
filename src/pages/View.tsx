import dayjs from 'dayjs'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { styled } from 'styled-components'

import Input from '@/components/elements/Input'
import Aside from '@/components/layouts/Aside'
import Message from '@/components/elements/Message'
import Card from '@/components/elements/Card'
import Label from '@/components/elements/Label'
import CustomDatePicker from '@/components/elements/DatePicker'
import useChatType from '@/hooks/useChatType'
import useChatStream from '@/hooks/useChatStream'
import useRandomId from '@/hooks/useRandomId'
import useScrollToBottom from '@/hooks/useScrollToBottom'
import { BasicManual } from '@/utils/constants'

interface ChatHistoryTypes {
  id: string
  queries: string
  answers: string
  source?: string
  actionId?: string
}

const ChatView = () => {
  const scrollEndRef = useRef<HTMLDivElement | null>(null)
  const nowTime = dayjs().format('YYYY. M. D hh:mm A')

  // 챗봇 타입
  const [selectedChatType, setSelectedChatType] = useState<string>('')

  // 카테고리 타입
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // 사용자 프롬포트
  const [chatHistory, setChatHistory] = useState<ChatHistoryTypes[]>([])

  // 재생성을 위한 가지고 있는 id
  const [regenerateId, setRegenerateId] = useState<string>()

  // 유효 세션 아이디
  const { id } = useRandomId()

  // 채팅 타입 선택
  const chatType = useChatType(selectedChatType)

  // 채팅의 마지막 데이터
  const lastChat = useMemo(
    () => chatHistory[chatHistory.length - 1],
    [chatHistory]
  )

  // stream api 통신
  const { messages } = useChatStream({
    url: selectedChatType,
    sessionId: id,
    queries: lastChat?.queries,
    interface_time: lastChat?.id,
  })

  // 답변 재생성
  useEffect(() => {
    const nowTime = dayjs().format('YYYYMMDDhhmmss')
    const regenerateQuery = chatHistory.find(
      (v) => v.id === regenerateId
    )?.queries

    if (regenerateQuery) {
      setChatHistory((prev) => [
        ...prev,
        {
          id: nowTime,
          queries: regenerateQuery + ' ',
          answers: '',
        },
      ])
    }
  }, [regenerateId])

  // 질문에 대한 답변이 쌓임
  useEffect(() => {
    if (chatHistory.length === 0) return

    setChatHistory((prev) => {
      const updatedHistory = [...prev]
      const lastIndex = updatedHistory.length - 1

      updatedHistory[lastIndex].answers = messages.join('')
      return updatedHistory
    })
  }, [messages])

  // 자동 스크롤 감지
  useScrollToBottom([messages, chatHistory], scrollEndRef)

  // qna / query / insight 선택하면 설명 + 추천 카테고리 보여주는 함수
  const renderChatOverview = useMemo(() => {
    if (!chatType) return null

    return (
      <Message
        text={chatType.text}
        type='basic'
        children={
          <Label
            data={chatType?.category}
            active={selectedCategory}
            setActive={setSelectedCategory}
            disabled={chatHistory.length > 0}
          />
        }
      />
    )
  }, [chatType, chatHistory, selectedCategory, setSelectedCategory])

  // 카테고리 선택하면 설명 보여주는 함수
  const renderCategoryDetails = useMemo(() => {
    if (!chatType) return null

    const categoryMessage = chatType.category.find(
      (v: any) => v.id === selectedCategory
    )?.text

    if (categoryMessage) {
      if (selectedChatType !== 'query/generate')
        return <Message text={categoryMessage} type='basic' />
      return (
        <Message
          text={categoryMessage}
          type='basic'
          children={<CustomDatePicker selectCategory={selectedCategory} />}
        />
      )
    }
  }, [chatType, selectedCategory])

  // 추천 카테고리 초기화
  useEffect(() => {
    setSelectedCategory('')
  }, [selectedChatType])

  // 새로운 채팅
  const handleNewChat = () => {
    setChatHistory([])
    setSelectedChatType('')
    setSelectedCategory('')
  }

  return (
    <ChatContainer>
      <Aside onClick={handleNewChat} />
      <ChatContent>
        <CurrentTime>{nowTime}</CurrentTime>
        <ChatAssistant>
          <Message
            text={BasicManual}
            type='basic'
            children={
              <Card
                setActive={setSelectedChatType}
                active={selectedChatType}
                disabled={chatHistory.length > 0}
              />
            }
          />
          {renderChatOverview}
          {renderCategoryDetails}
          {chatHistory.map(({ id, queries, answers }, index) => (
            <ChatHistoryItem key={`${id}_${index}`}>
              <Message key={`${id}_${index}`} text={queries} type='queries' />
              <Message
                id={id}
                key={`answers_${id}_${index}`}
                type='answers'
                text={answers}
                setRegenerate={setRegenerateId}
              />
            </ChatHistoryItem>
          ))}
        </ChatAssistant>
        <Input setState={setChatHistory} disabled={selectedChatType === ''} />
        <div ref={scrollEndRef}></div>
      </ChatContent>
    </ChatContainer>
  )
}

export default ChatView

const ChatContainer = styled.div`
  background-color: ${({ theme }) => theme.color.black};
  width: 100%;
  height: -webkit-fill-available;
  position: absolute;
  top: 0;
  border-radius: 1rem;
  padding-top: 40px;
  display: flex;
`

const ChatContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 20px 0 70px 0;
  scrollbar-width: thin;
  scrollbar-color: #444654 #131314;
`

const CurrentTime = styled.div`
  background-color: ${({ theme }) => theme.color.blue_100};
  color: ${({ theme }) => theme.color.white};
  border-radius: 20px;
  width: fit-content;
  padding: 4px 12px;
  font-size: ${(props) => props.theme.fontSizes.xs};
`

const ChatAssistant = styled.div`
  width: -webkit-fill-available;
  color: ${({ theme }) => theme.color.gray_400};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
`

const ChatHistoryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
