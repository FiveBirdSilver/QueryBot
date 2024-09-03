interface QueryLM {
  id: string
  interface_time: string
}

const getQueryLLM = async (
  props: QueryLM,
  onChunkReceived: (chunk: string) => void
): Promise<void> => {
  const { id, interface_time } = props

  try {
    const response = await fetch(
      'https://chatbot-api-ver2-xbuguatioa-du.a.run.app/api/query/llm',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          interface_time: interface_time,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let message = ''

    const readStream = async () => {
      let result
      if (reader) {
        while (!(result = await reader.read()).done) {
          const chunk = decoder.decode(result.value, { stream: true })
          message += chunk
          onChunkReceived(chunk)
        }
      }
    }
    await readStream()
  } catch (error) {
    console.error(error)
  }
}
export default getQueryLLM
