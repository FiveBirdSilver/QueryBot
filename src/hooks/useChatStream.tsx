import { useState, useEffect } from 'react'

interface ChatStreamProps {
  url: string
  sessionId: string
  queries: string
  interface_time: string
}

const useChatStream = (props: ChatStreamProps) => {
  const { url, sessionId, interface_time, queries } = props

  const API_URL = import.meta.env.VITE_API_URL
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const getResponse = async () => {
      const request = JSON.stringify({
        user_input: queries,
        user_id: sessionId,
        interface_time: interface_time,
      })
      try {
        setMessages([])
        const response = await fetch(`${API_URL}/${url}`, {
          method: 'POST',
          body: request,
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
        await readStream()
      } catch (err) {
        console.error(err)
        setMessages((pre) => [...pre, '죄송합니다. 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'])
      }
    }

    if (queries) {
      (async () => {
        await getResponse() // 비동기 작업을 즉시 실행 함수로 감싸서 처리
      })()
    }
  }, [API_URL, url, sessionId, interface_time, queries])

  return { messages }
}

export default useChatStream
