import { useEffect, useRef } from 'react'

function useDelayAction<T>(value: T, delay: number, action: () => void): void {
  const valueRef = useRef(value)

  useEffect(() => {
    valueRef.current = value

    const timeoutId = setTimeout(() => {
      if (valueRef.current === value) {
        action()
      }
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [value, delay])
}

export default useDelayAction
