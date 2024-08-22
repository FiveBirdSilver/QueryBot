import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { styled } from "styled-components";
import { Button, Skeleton, Tooltip } from "antd";
import { MdOutlineFileDownload } from "react-icons/md";
import { PiCopySimple } from "react-icons/pi";
import { FiMoreHorizontal } from "react-icons/fi";
import { TbRefresh } from "react-icons/tb";
import { IoMdCheckmark } from "react-icons/io";

import copyToClipboard from "utils/copyToClipboard";

interface MessageProps {
  type: "basic" | "queries" | "answers";
  text: string;
  children?: React.ReactNode;
}

const Message = (props: MessageProps) => {
  const { type, text, children } = props;
  const textIndex = useRef<number>(0);

  const [typingText, setTypingText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (text && type === "answers") {
      let timer = setInterval(() => {
        setTypingText((state) => {
          if (text?.length <= textIndex.current) {
            clearInterval(timer);
            return state;
          }
          const newState = text?.slice(0, textIndex.current) + "ㅤ";
          textIndex.current += 1;
          return newState;
        });
      }, 10);
      return () => {
        clearInterval(timer);
      };
    }
  }, [text]);

  useEffect(() => {
    if (type === "basic" || type === "queries") setIsLoading(false);
    if (type === "answers" && typingText !== "") setIsLoading(false);
  }, [typingText]);

  // 답변 복사
  const handleOnCopy = () => {
    copyToClipboard(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <AssistantWrapper>
      {isLoading ? (
        <Skeleton avatar paragraph={{ rows: 2 }} active />
      ) : (
        <>
          <AssistantTitle $type={type}>
            <AssistantIcons>{type === "queries" ? "U" : "G"}</AssistantIcons>
            <span>{type !== "queries" && "GenAIon Chatbot"}</span>
          </AssistantTitle>
          {type === "answers" ? (
            <>
              <AssistantMarkdown>{typingText}</AssistantMarkdown>
              <UtilityIconsContainer>
                <UtilityIcons>
                  <TbRefresh />
                  <span>Regenerate Answer</span>
                </UtilityIcons>
                <UtilityIcons>
                  <MdOutlineFileDownload />
                  {isCopied ? <IoMdCheckmark /> : <PiCopySimple onClick={handleOnCopy} />}
                  <Tooltip
                    placement="bottom"
                    title={
                      <MoreTooltip>
                        <p>메세지 삭제</p>
                        <hr />
                        <p>메세지 신고</p>
                      </MoreTooltip>
                    }
                    arrow={false}
                  >
                    <FiMoreHorizontal />
                  </Tooltip>
                </UtilityIcons>
              </UtilityIconsContainer>
            </>
          ) : (
            <AssistantContent $type={type}>
              {text}
              {children}
            </AssistantContent>
          )}
        </>
      )}
    </AssistantWrapper>
  );
};

export default Message;

const AssistantWrapper = styled.div`
  color: #444444;
`;

const AssistantTitle = styled.div<{ $type: "basic" | "queries" | "answers" }>`
  display: flex;
  justify-content: ${(props) => (props.$type === "queries" ? "flex-end" : "flex-start")};
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;

  span {
    font-size: 0.825rem;
    font-weight: bold;
    color: #fff;
  }
`;

const AssistantIcons = styled.div`
  background-color: rgb(160, 195, 255);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AssistantContent = styled.div<{ $type: "basic" | "queries" | "answers" }>`
  margin: ${(props) => (props.$type === "queries" ? " 0 35px 0 10px" : " 0 10px 0 35px")} !important;
  padding: 12px;
  font-size: 0.765rem;
  white-space: break-spaces;
  color: #f5f5f5;
  background-color: ${(props) => (props.$type === "queries" ? "#4B89D4" : "#1E1F20")};
  border-top-right-radius: ${(props) => (props.$type === "queries" ? 0 : "1rem")};
  border-top-left-radius: ${(props) => (props.$type === "queries" ? "1rem" : 0)};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const AssistantMarkdown = styled(ReactMarkdown)`
  margin: 0 10px 0 35px;
  padding: 12px;
  font-size: 0.765rem;
  display: flex;
  flex-direction: column;
  white-space: break-spaces;
  color: #f5f5f5;
  background-color: #1e1f20;
  border-top-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const UtilityIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 0 35px;
`;

const UtilityIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;

  svg {
    color: #f5f5f5;
    cursor: pointer;
  }
  span {
    color: #f5f5f5;
    font-size: 0.645rem;
  }
`;

const MoreTooltip = styled.div`
  hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 0.695rem;
    padding: 2px 4px;
    cursor: pointer;
  }
`;
