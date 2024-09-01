import dayjs from 'dayjs'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'

import Input from 'components/elements/Input'
import Aside from 'components/layouts/Aside'
import Message from 'components/elements/Message'
import Card from 'components/elements/Card'
import Label from 'components/elements/Label'
import CustomDatePicker from 'components/elements/DatePicker'

import useChatType from 'hooks/useChatType'
import useChatStream from 'hooks/useChatStream'
import useDelayAction from 'hooks/useDelayAction'
import useRandomId from 'hooks/useRandomId'
import useScrollToBottom from 'hooks/useScrollToBottom'

import generateMarkdownTable from 'utils/generateMarkdownTable'
import {
  BasicManual,
  BigQueryManual,
  InsightChatData,
  InsightTableData,
} from 'utils/constants'
import filterIndexId from 'utils/filterIndexId'
import getQueryLLM from 'utils/getQueryLLM'

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

  // 채팅의 마지막 데이터
  const lastAnswer = useMemo(
    () => chatHistory[chatHistory.length - 1],
    [chatHistory]
  )

  // stream api 통신
  const { messages } = useChatStream({
    url: `/${selectChat}`,
    sessionId: id,
    queries: lastAnswer?.queries,
    interface_time: lastAnswer?.id,
    index: chatHistory.length,
  })

  // 질문에 대한 답변이 쌓임
  useEffect(() => {
    if (chatHistory.length === 0) return

    setChatHistory((prev) => {
      const updatedHistory = [...prev]
      const lastIndex = updatedHistory.length - 1

      const lowercaseMessages = messages.join('').toLowerCase()
      const splitMsg = lowercaseMessages.split('reference')

      if (selectChat === 'qna') {
        updatedHistory[lastIndex].answers = splitMsg[0]
        updatedHistory[lastIndex].source = splitMsg[1]?.trim().split('[')[1]
      } else {
        updatedHistory[lastIndex].answers = messages.join('')
      }
      return updatedHistory
    })
  }, [messages])

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
            data={chatType?.category}
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

  // 추천 카테고리 초기화
  useEffect(() => {
    setSelectCategory('')
  }, [selectChat])

  // 응답이 완전히 생성된 후 빅쿼리 업로드 확인용 메시지 생성
  useDelayAction(
    messages,
    selectChat === 'query/generate' ? 3000 : 15000,
    () => {
      const isSql = lastAnswer?.answers.match(/```sql/g)
      if (
        (selectChat === 'query/generate' || selectChat === 'insight') &&
        isSql
      ) {
        setBigQueryId(lastAnswer.id)
        setChatHistory((prev) => [
          ...prev,
          {
            id: lastAnswer.id,
            queries: '',
            answers: BigQueryManual,
            actionId: 'query/dry',
          },
        ])
      }
    }
  )

  // 새로운 채팅
  const setNewChat = () => {
    setSelectChat('')
    setSelectCategory('')
    setChatHistory([])
    setBigQueryId(undefined)
  }

  const getQueryDry = async (url: string) => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://chatbot-api-ver2-xbuguatioa-du.a.run.app/api/' + url,
          {
            user_id: id, //> user_id,
            interface_time: filterIndexId(bigQueryId!),
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
              '쿼리를 생성할 수 없습니다. 결과를 재생성할까요? '
            updatedHistory[lastIndex].actionId = 'query/generate'
            return updatedHistory
          })
        }
      } catch (error) {
        setChatHistory((prev) => {
          const updatedHistory = [...prev]
          const lastIndex = updatedHistory.length - 1
          updatedHistory[lastIndex].answers =
            '죄송합니다. 통신 중 문제가 발생했습니다. 다시 질문해 주세요. '
          return updatedHistory
        })
      }
    }

    if (selectChat !== 'insight') fetchData()
    else {
      setChatHistory((prev) => {
        const updatedHistory = [...prev]
        const lastIndex = updatedHistory.length - 1
        updatedHistory[lastIndex].answers =
          `실행 시 이 쿼리가 8.39GB를 처리합니다. `
        updatedHistory[lastIndex].actionId = 'query/run'
        return updatedHistory
      })
    }
  }

  const getQueryRun = (url: string) => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://chatbot-api-ver2-xbuguatioa-du.a.run.app/api/' + url,
          {
            user_id: id,
            interface_time: filterIndexId(bigQueryId!),
          }
        )

        if (response.data.status === 200) {
          setChatHistory((prev) => {
            const updatedHistory = [...prev]
            const lastIndex = updatedHistory.length - 1

            updatedHistory[lastIndex].answers = generateMarkdownTable(
              response.data.data
            )
            updatedHistory[lastIndex].answers += '\n'
            return updatedHistory
          })

          await getQueryLLM(
            { id: id, interface_time: response.data?.interface_time },
            (chunk: any) => {
              setChatHistory((prev) => {
                const updatedHistory = [...prev]
                const lastIndex = updatedHistory.length - 1
                updatedHistory[lastIndex].answers += chunk
                return updatedHistory
              })
            }
          )
        }
      } catch (error) {
        console.log(error)
        setChatHistory((prev) => {
          const updatedHistory = [...prev]
          const lastIndex = updatedHistory.length - 1
          updatedHistory[lastIndex].answers =
            '쿼리를 생성할 수 없습니다. 결과를 재생성할까요? '
          updatedHistory[lastIndex].actionId = 'query/generate'
          return updatedHistory
        })
      }
    }

    if (selectChat !== 'insight') fetchData()
    else {
      setChatHistory((prev) => {
        const updatedHistory = [...prev]
        const lastIndex = updatedHistory.length - 1

        updatedHistory[lastIndex].answers =
          generateMarkdownTable(InsightTableData)
        return updatedHistory
      })
    }
  }

  const getRunQuery = async (id: string) => {
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
    if (id === 'query/generate') {
      setChatHistory((prev) => {
        const updatedHistory = [...prev]
        const lastIndex = updatedHistory.length - 1
        updatedHistory[lastIndex].id = filterIndexId(bigQueryId!)!
        updatedHistory[lastIndex].queries = 'regenerate'
        return updatedHistory
      })
    }
  }

  const getCancel = () => {
    setChatHistory((prev) => {
      const updatedHistory = [...prev]
      const lastIndex = updatedHistory.length - 1
      updatedHistory[lastIndex].answers = ''
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
                  onOk={() => getRunQuery(actionId!)}
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
