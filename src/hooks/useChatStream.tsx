import { useState, useEffect } from 'react'
import useDate from 'hooks/useDate'
import {
  InsightChatData_1,
  InsightChatData_2,
  InsightChatData_6,
} from 'utils/constants'

interface ChatStreamProps {
  url: string
  sessionId: string
  queries: string
  interface_time: string
  index: number
}

const useChatStream = (props: ChatStreamProps) => {
  const { url, sessionId, interface_time, queries, index } = props

  const { date } = useDate()
  const baseUrl = 'https://chatbot-api-ver2-xbuguatioa-du.a.run.app/api'

  const [messages, setMessages] = useState<string[]>([])

  const getFilterQuery = () => {
    if (queries === 'regenerate') return ''
    else {
      if (url === '/query/generate' && date) return `${date} ${queries}`
      else return queries
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMessages([])
        const response = await fetch(baseUrl + url, {
          method: 'POST',
          body: JSON.stringify({
            user_input: getFilterQuery(),
            user_id: sessionId, //> user_id,
            interface_time: interface_time,
          }),
        })
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        const readStream = async () => {
          let result
          if (reader) {
            while (!(result = await reader.read()).done) {
              const chunk = decoder.decode(result.value, { stream: true })
              setMessages((pre) => [...pre, chunk])
            }
          }
        }
        readStream()
      } catch (err) {
        console.error(err)
        // setError(err);
      }
    }

    const setInsightData = () => {
      if (index === 1) return InsightChatData_1
      if (index === 2) return InsightChatData_2
      if (index === 6) return InsightChatData_6
      return []
    }

    const dummyData = async () => {
      // 첫 번째 메시지를 2초 후에 설정
      setTimeout(() => {
        setMessages([setInsightData()[0]])
      }, 2000)

      // 두 번째 메시지부터 0.5초 간격으로 추가
      for (let i = 1; i < setInsightData().length; i++) {
        setTimeout(
          () => {
            setMessages((prevMessages) => [
              ...prevMessages,
              setInsightData()[i], // 수정된 부분: 배열의 i번째 요소 접근
            ])
          },
          2000 + i * 500
        )
      }
    }

    if (queries) {
      if (url === '/insight') dummyData()
      else fetchData()
    }
  }, [url, sessionId, queries])

  return { messages }
}

export default useChatStream
