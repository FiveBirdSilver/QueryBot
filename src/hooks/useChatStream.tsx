import { useState, useEffect } from 'react'
import useDate from 'hooks/useDate'
import { InsightChatData } from 'utils/constants'

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
    const dummyData = async () => {
      setTimeout(
        () =>
          setMessages(
            index === 6 ? [InsightChatData[2]] : [InsightChatData[index - 1]]
          ),
        2000
      )
    }

    if (queries) {
      if (url === '/insight') dummyData()
      else fetchData()
    }
  }, [url, sessionId, queries])

  return { messages }
}

export default useChatStream
