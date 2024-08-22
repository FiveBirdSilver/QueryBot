import { useState, useEffect } from "react";

interface ChatStreamProps {
  url: string;
  queries: string;
}

const useChatStream = (props: ChatStreamProps) => {
  const { url, queries } = props;
  const baseUrl = "https://chatbot-api-ver2-xbuguatioa-du.a.run.app/api";

  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setMessages([]);

        const response = await fetch(baseUrl + url, {
          method: "POST",
          body: JSON.stringify({
            user_input: queries,
            session_id: "1123451000",
          }),
        });
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const readStream = async () => {
          let result;
          if (reader) {
            while (!(result = await reader.read()).done) {
              const chunk = decoder.decode(result.value, { stream: true });
              setMessages((pre) => [...pre, chunk]);
            }
          }
        };
        readStream();
        setLoading(false);
      } catch (err) {
        console.log(err);
        // setError(err);
      }
    };
    if (queries) fetchData();
  }, [queries]);

  return { messages, loading };
};

export default useChatStream;
