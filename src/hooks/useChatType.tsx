import { InsightManual, QnaManual, QueryManual } from '../utils/constants'
import { useMemo } from 'react'

const useChatType = (selectChat: string) => {
  return useMemo(() => {
    switch (selectChat) {
      case 'qna':
        return QnaManual
      case 'sql':
        return QueryManual
      case 'insight':
        return InsightManual
      default:
        return null
    }
  }, [selectChat])
}

export default useChatType
