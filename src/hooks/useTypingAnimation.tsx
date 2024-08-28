import { useEffect, useRef, useState } from "react";

const useTypingAnimation = (text: string) => {
  const [typingText, setTypingText] = useState<string>("");
  const textIndex = useRef<number>(0);

  useEffect(() => {
    if (text) {
      const timer = setInterval(() => {
        setTypingText((state) => {
          if (text.length <= textIndex.current) {
            clearInterval(timer);
            return state;
          }
          const newState = text.slice(0, textIndex.current);
          textIndex.current += 1;
          return newState;
        });
      }, 10);

      return () => clearInterval(timer);
    }
  }, [text]);

  return typingText;
};

export default useTypingAnimation;
