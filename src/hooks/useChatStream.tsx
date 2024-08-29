import { useState, useEffect } from 'react'
import useDate from 'hooks/useDate'

interface ChatStreamProps {
  url: string
  sessionId: string
  queries: string
  interface_time: string
}

const useChatStream = (props: ChatStreamProps) => {
  const { url, sessionId, interface_time, queries } = props
  const { date } = useDate()
  const baseUrl = 'https://chatbot-api-ver2-xbuguatioa-du.a.run.app/api'

  const [messages, setMessages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setMessages([])

        const response = await fetch(baseUrl + url, {
          method: 'POST',
          body: JSON.stringify({
            user_input:
              url === '/query/generate' && date !== ''
                ? `${date} ${queries}`
                : queries,
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
        setLoading(false)
      } catch (err) {
        console.error(err)
        // setError(err);
      }
    }
    if (queries) {
      fetchData()
    }
  }, [url, sessionId, queries])

  return { messages, loading }
}

export default useChatStream
