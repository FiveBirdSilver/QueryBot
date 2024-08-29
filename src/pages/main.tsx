import dayjs from 'dayjs'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { styled } from 'styled-components'

import Input from 'components/elements/Input'
import Aside from 'components/layouts/Aside'
import Message from 'components/elements/Message'
import Card from 'components/elements/Card'
import Label from 'components/elements/Label'
import Button from 'components/elements/Button'
import CustomDatePicker from 'components/elements/DatePicker'
import useChatType from 'hooks/useChatType'
import useChatStream from 'hooks/useChatStream'
import useDelayAction from 'hooks/useDelayAction'
import useRandomId from 'hooks/useRandomId'
import useScrollToBottom from 'hooks/useScrollToBottom'
import useChatJson from 'hooks/useChatJson'
import { DatePickerManual, BasicManual, BigQueryManual } from 'utils/constants'

const Main = () => {
  const scrollEndRef = useRef<HTMLDivElement | null>(null)
  const nowTime = dayjs().format('YYYY. M. D hh:mm A')

  // 챗봇 타입
  const [selectChat, setSelectChat] = useState<string>('')

  // 카테고리 타입
  const [selectCategory, setSelectCategory] = useState<string>('')

  // 사용자 프롬포트
  const [chatHistory, setChatHistory] = useState<
    {
      id: string
      queries: string
      answers: string
      actionId?: string
    }[]
  >([])

  const [showDatePicker, setShowDatePicker] = useState<boolean>(true)
  const [bigQueryId, setBigQueryId] = useState<string[]>()

  // 유효 아이디
  const { id } = useRandomId()

  // 채팅 타입 선택
  const chatType = useChatType(selectChat)

  // stream api 통신
  const { messages } = useChatStream({
    url: `/${selectChat}`,
    sessionId: id,
    queries: chatHistory[chatHistory.length - 1]?.queries,
    interface_time: chatHistory[chatHistory.length - 1]?.id,
  })

  // 채팅의 마지막 데이터
  const lastAnswer = useMemo(
    () => chatHistory[chatHistory.length - 1],
    [chatHistory]
  )

  // 자동 스크롤 감지
  useScrollToBottom([messages, chatHistory, bigQueryId], scrollEndRef)

  // qna / query / insight 선택하면 설명 + 추천 카테고리 보여주는 함수
  const showChatOverview = useMemo(() => {
    if (!chatType) return null

    return (
      <>
        <Message
          text={chatType.text}
          type='basic'
          children={
            <Label
              data={chatType.category}
              active={selectCategory}
              setActive={setSelectCategory}
              disabled={chatHistory.length > 0}
            />
          }
        />
        {selectChat === 'query/generate' && showDatePicker && (
          <Message
            text={DatePickerManual}
            type='basic'
            children={
              <CustomDatePicker setShowDatePicker={setShowDatePicker} />
            }
          />
        )}
      </>
    )
  }, [chatType, chatHistory, selectCategory, showDatePicker, setSelectCategory])

  // 카테고리 선택하면 설명 보여주는 함수
  const showCategoryDetails = useMemo(() => {
    if (!chatType) return null

    const tmpMsg = chatType.category.find(
      (v: any) => v.id === selectCategory
    )?.text

    if (tmpMsg) return <Message text={tmpMsg} type='basic' />
  }, [chatType, selectCategory])

  //
  // // 빅쿼리 조회 함수
  // const showBigQueryData = useMemo(() => {
  //   if (bigQueryId)
  //     return (
  //       <Message
  //         text={BigQueryManual}
  //         type='basic'
  //         children={
  //           <ButtonContainer>
  //             <Button
  //               text={'건너뛰기'}
  //               status={'cancel'}
  //               onclick={() => setBigQueryId(undefined)}
  //             />
  //             <Button
  //               text={'확인'}
  //               status={'primary'}
  //               onclick={handleBigQueryConfirmation}
  //             />
  //           </ButtonContainer>
  //         }
  //       />
  //     )
  // }, [bigQueryId])

  // 질문에 대한 답변이 쌓임
  useEffect(() => {
    if (chatHistory.length === 0) return

    setChatHistory((prev) => {
      const updatedHistory = [...prev]
      const lastIndex = updatedHistory.length - 1
      const splitMsg = messages.join('').split('**Reference')

      // if (selectChat === 'qna') {
      //   updatedHistory[lastIndex].answers = splitMsg[0]
      //   updatedHistory[lastIndex].source =
      //     splitMsg[1]?.split(': ')[1] !== '[]'
      //       ? splitMsg[1]?.split(': ')[1]?.replace(/[\[\]']/g, '')
      //       : ''
      // } else
      //
      updatedHistory[lastIndex].answers = messages.join('')

      return updatedHistory
    })
  }, [messages])

  // 응답이 완전히 생성된 후 빅쿼리 업로드 확인용 메시지 생성
  useDelayAction(messages, 5000, () => {
    const isSql = lastAnswer?.answers.match(/```sql/g)
    if (selectChat === 'query/generate' && isSql) {
      const id = isSql?.map((_, index) => `${lastAnswer.id}_${index}`)
      // setBigQueryId(id)
      setChatHistory((prev) => [
        ...prev,
        {
          id: id[0],
          queries: '',
          answers: BigQueryManual,
          action: 'query/generate',
        },
      ])
    }
  })

  // 새로운 채팅
  const setNewChat = () => {
    setChatHistory([])
    setSelectChat('')
    setBigQueryId(undefined)
  }

  return (
    <MainContainer>
      <Aside onClick={() => setNewChat()} />
      <MainWrapper>
        <NowTimeBox>{nowTime}</NowTimeBox>
        <AssistantContainer>
          <Message
            text={BasicManual}
            type='basic'
            children={
              <Card
                setActive={setSelectChat}
                active={selectChat}
                disabled={chatHistory.length > 0}
              />
            }
          />
          {showChatOverview}
          {showCategoryDetails}
          {chatHistory.map(({ id, queries, answers, actionId }) => (
            <StyledChatHistory key={id}>
              <Message key={`queries_${id}`} text={queries} type='queries' />
              <Message
                key={`answers_${id}`}
                type='answers'
                text={answers}
                actionId={actionId}
              />
            </StyledChatHistory>
          ))}
          {/*{bigQueryId && (*/}
          {/*  <Message*/}
          {/*    text={BigQueryManual}*/}
          {/*    type='basic'*/}
          {/*    children={*/}
          {/*      <ButtonContainer>*/}
          {/*        <Button*/}
          {/*          text={'건너뛰기'}*/}
          {/*          status={'cancel'}*/}
          {/*          onclick={() => setBigQueryId(undefined)}*/}
          {/*        />*/}
          {/*        <Button*/}
          {/*          text={'확인'}*/}
          {/*          status={'primary'}*/}
          {/*          // onclick={() =>*/}
          {/*          //   useChatJson({*/}
          {/*          //     url: '/query/dry',*/}
          {/*          //     sessionId: id,*/}
          {/*          //     interface_time: bigQueryId[0],*/}
          {/*          //   })*/}
          {/*          // }*/}
          {/*        />*/}
          {/*      </ButtonContainer>*/}
          {/*    }*/}
          {/*  />*/}
          {/*)}*/}
        </AssistantContainer>
        <Input
          setState={setChatHistory}
          disabled={selectChat === '' || bigQueryId !== undefined}
        />
        <div ref={scrollEndRef}></div>
      </MainWrapper>
    </MainContainer>
  )
}

export default Main

const MainContainer = styled.div`
  background-color: #131314;
  width: 100%;
  height: -webkit-fill-available;
  position: absolute;
  top: 0;
  border-radius: 1rem;
  padding-top: 40px;
  display: grid;
  grid-template-columns: 1.5fr 8.5fr;
`

const MainWrapper = styled.div`
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

const NowTimeBox = styled.div`
  background-color: #4b89d4;
  color: #ffffff;
  border-radius: 20px;
  width: fit-content;
  padding: 4px 12px;
  font-size: 0.625rem;
`

const AssistantContainer = styled.div`
  width: -webkit-fill-available;
  color: #444444;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
`

const StyledChatHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`
