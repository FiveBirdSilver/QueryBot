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
import axios from 'axios'

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
      source?: string
      actionId?: string
    }[]
  >([])

  const [showDatePicker, setShowDatePicker] = useState<boolean>(true)
  const [bigQueryId, setBigQueryId] = useState<string>()

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
    )
  }, [chatType, chatHistory, selectCategory, showDatePicker, setSelectCategory])

  // 카테고리 선택하면 설명 보여주는 함수
  const showCategoryDetails = useMemo(() => {
    if (!chatType) return null

    const tmpMsg = chatType.category.find(
      (v: any) => v.id === selectCategory
    )?.text

    if (tmpMsg) {
      if (selectChat !== 'query/generate')
        return <Message text={tmpMsg} type='basic' />
      if (showDatePicker) {
        return (
          <Message
            text={tmpMsg}
            type='basic'
            children={
              <CustomDatePicker setShowDatePicker={setShowDatePicker} />
            }
          />
        )
      }
    }
  }, [chatType, selectCategory])

  // 질문에 대한 답변이 쌓임
  useEffect(() => {
    if (chatHistory.length === 0) return

    setChatHistory((prev) => {
      const updatedHistory = [...prev]
      const lastIndex = updatedHistory.length - 1

      // Convert the entire message string to lowercase to handle both "Reference" and "reference"
      const lowercaseMessages = messages.join('').toLowerCase()

      const splitMsg = lowercaseMessages.split('reference')

      if (selectChat === 'qna') {
        updatedHistory[lastIndex].answers = splitMsg[0]
        updatedHistory[lastIndex].source = splitMsg[1]?.trim().split('[')[1]
        // !== '[]'
        //     ? splitMsg[1]?.split(': ')[1]?.replace(/[\[\]']/g, '')
        //     : ''
      } else {
        updatedHistory[lastIndex].answers = messages.join('')
      }
      return updatedHistory
    })
  }, [messages])

  // 응답이 완전히 생성된 후 빅쿼리 업로드 확인용 메시지 생성
  useDelayAction(messages, 3000, () => {
    const isSql = lastAnswer?.answers.match(/```sql/g)
    if (selectChat === 'query/generate' && isSql) {
      const id = isSql?.map((_, index) => `${lastAnswer.id}_${index}`)
      setBigQueryId(id[0])
      setChatHistory((prev) => [
        ...prev,
        {
          id: id[0],
          queries: '',
          answers: BigQueryManual,
          actionId: 'query/dry',
        },
      ])
    }
  })

  // 새로운 채팅
  const setNewChat = () => {
    setSelectChat('')
    setChatHistory([])
    setBigQueryId(undefined)
  }

  const getQueryDry = async (url: string) => {
    try {
      const response = await axios.post(
        'https://chatbot-api-ver2-xbuguatioa-du.a.run.app/api/' + url,
        {
          user_id: id, //> user_id,
          interface_time: bigQueryId,
          // interface_time: chatHistory[chatHistory.length - 1]?.id,
        }
      )
      if (response.data.status === 200) {
        setChatHistory((prev) => {
          const updatedHistory = [...prev]
          const lastIndex = updatedHistory.length - 1
          updatedHistory[lastIndex].answers =
            `실행 시 이 쿼리가 ${response?.data.result}를 처리합니다. `
          updatedHistory[lastIndex].actionId = 'query/run'
          return updatedHistory
        })
      }
      if (response.data.status === 400) {
        setChatHistory((prev) => {
          const updatedHistory = [...prev]
          const lastIndex = updatedHistory.length - 1
          updatedHistory[lastIndex].answers =
            `쿼리를 생성할 수 없습니다. 결과를 재생성할까요? `
          updatedHistory[lastIndex].actionId = 'query/generate'
          return updatedHistory
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [test, setTest] = useState<string>('')
  function generateMarkdownTable(data: any) {
    const keys = Object.keys(data)

    const rowCount = Array.isArray(data[keys[0]]) ? data[keys[0]].length : 1

    const tableHeader = `| ${keys.join(' | ')} |`
    const tableSeparator = `|${keys.map(() => '------------------').join('|')}|`

    let rows = ''

    for (let i = 0; i < rowCount; i++) {
      const row = keys
        .map((key) => {
          const value = data[key]
          if (Array.isArray(value)) {
            return value[i] !== undefined ? value[i] : ''
          } else {
            return i === 0 ? value.toLocaleString() : ''
          }
        })
        .join(' | ')

      rows += `| ${row} |\n`
    }

    return `${tableHeader}\n${tableSeparator}\n${rows}`
  }

  const getQueryLLM = async (interface_time: string) => {
    try {
      const response = await fetch(
        'https://chatbot-api-ver2-xbuguatioa-du.a.run.app/api/query/llm',
        {
          method: 'POST',
          body: JSON.stringify({
            user_id: id, //> user_id,
            interface_time: interface_time,
          }),
        }
      )
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      const readStream = async () => {
        let result
        if (reader) {
          while (!(result = await reader.read()).done) {
            const chunk = decoder.decode(result.value, { stream: true })
            // setMessages((pre) => [...pre, chunk])
            setChatHistory((prev) => {
              const updatedHistory = [...prev]
              const lastIndex = updatedHistory.length - 1
              updatedHistory[lastIndex].answers = chunk
              return updatedHistory
            })
          }
        }
      }
      readStream()
    } catch (error) {
      console.log(error)
    }
  }

  const getQueryRun = async (url: string) => {
    try {
      const response = await axios.post(
        'https://chatbot-api-ver2-xbuguatioa-du.a.run.app/api/' + url,
        {
          user_id: id, //> user_id,
          // interface_time: chatHistory[chatHistory.length - 1]?.id,
          interface_time: bigQueryId,
        }
      )
      if (response.data.status === 200) {
        // const data = JSON.parse(response.data.data)
        // console.log(response.data?.interface_time)
        setChatHistory((prev) => {
          const updatedHistory = [...prev]
          const lastIndex = updatedHistory.length - 1
          updatedHistory[lastIndex].answers = generateMarkdownTable(
            response.data.data
          )
          return updatedHistory
        })
        getQueryLLM(response.data?.interface_time)
        // setSelectChat('/query/llm')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTest = async (id: string) => {
    setChatHistory((prev) => {
      const updatedHistory = [...prev]
      const lastIndex = updatedHistory.length - 1
      updatedHistory[lastIndex].actionId = ''
      return updatedHistory
    })

    setChatHistory((prev) => [
      ...prev,
      {
        id: bigQueryId!,
        queries: '',
        answers: '',
      },
    ])

    if (id === 'query/dry') getQueryDry(id)
    if (id === 'query/run') getQueryRun(id)
  }

  const getCancel = () => {
    setChatHistory((prev) => {
      const updatedHistory = [...prev]
      const lastIndex = updatedHistory.length - 1
      updatedHistory[lastIndex].answers = ''
      updatedHistory[lastIndex].actionId = ''
      return updatedHistory
    })
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
          {chatHistory.map(
            ({ id, queries, answers, source, actionId }, index) => (
              <StyledChatHistory key={`${id}_${index}`}>
                <Message key={`${id}_${index}`} text={queries} type='queries' />
                <Message
                  key={`answers_${id}`}
                  type='answers'
                  text={answers}
                  source={source}
                  actionId={actionId}
                  onCancel={() => getCancel()}
                  onOk={() => getTest(actionId!)}
                />
              </StyledChatHistory>
            )
          )}
        </AssistantContainer>
        <Input
          setState={setChatHistory}
          // disabled={selectChat === '' || bigQueryId !== undefined}
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
