import { useEffect, RefObject } from 'react'

function useScrollToBottom(
  dependency: any[],
  scrollRef: RefObject<HTMLDivElement>
): void {
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }

    scrollToBottom()
  }, [dependency, scrollRef])
}

export default useScrollToBottom
