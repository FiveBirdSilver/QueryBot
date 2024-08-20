import { InsightManual, QnaManual, QueryManual } from "../utils/AssistantManual";
import { useMemo } from "react";

const useChatType = (selectChat: string) => {
  const manualType = useMemo(() => {
    switch (selectChat) {
      case "qna":
        return QnaManual;
      case "query":
        return QueryManual;
      case "insight":
        return InsightManual;
      default:
        return null;
    }
  }, [selectChat]);

  return manualType;
};

export default useChatType;
