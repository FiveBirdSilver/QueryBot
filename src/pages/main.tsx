import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "styled-components";

import Input from "components/elements/Input";
import Aside from "components/layouts/Aside";
import Message from "components/elements/Message";
import Card from "components/elements/Card";
import Label from "components/elements/Label";
import useChatType from "hooks/useChatType";
import useChatStream from "hooks/useChatStream";
import useRandomId from "hooks/useRandomId";
import { BasicManual } from "utils/constants";

const Main = () => {
  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  const nowTime = dayjs().format("YYYY. M. D hh:mm A");
  // 챗봇 타입
  const [selectChat, setselectChat] = useState<string>("");
  // 카테고리 타입
  const [selectCategory, setselectCategory] = useState<string>("");

  // 사용자 프롬포트
  const [chatHistory, setChatHistory] = useState<{ queries: string; answers: string }[]>([]);

  // 유효 아이디
  const { id } = useRandomId();

  const chatType = useChatType(selectChat);

  const { messages } = useChatStream({
    url: `/${selectChat}`,
    sessionId: id,
    queries: chatHistory[chatHistory.length - 1]?.queries,
  });

  // qna / query / insight 선택하면 설명 + 추천 카테고리 보여주는 함수
  const showChatOverview = useMemo(() => {
    if (!chatType) return null;

    return (
      <Message
        text={chatType.text}
        type="basic"
        children={
          <Label
            data={chatType.category}
            active={selectCategory}
            setActive={setselectCategory}
            disabled={chatHistory.length > 0}
          />
        }
      />
    );
  }, [chatHistory, selectChat, selectCategory, setselectCategory]);

  // 카테고리 선택하면 설명 보여주는 함수
  const showCategoryDetails = useMemo(() => {
    if (!chatType) return null;

    const tmpMsg = chatType.category.find((v: any) => v.id === selectCategory)?.text;

    if (tmpMsg) return <Message text={tmpMsg} type="basic" />;
  }, [selectCategory, setselectCategory]);

  // 질문에 대한 답변이 쌓임
  useEffect(() => {
    if (chatHistory.length === 0) return;

    setChatHistory((prev) => {
      const updatedHistory = [...prev];
      const lastIndex = updatedHistory.length - 1;

      updatedHistory[lastIndex].answers = messages.join("");

      return updatedHistory;
    });
  }, [messages]);

  // 자동 스크롤 감지
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollEndRef.current) {
        scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    setTimeout(scrollToBottom, 0);
  }, [messages, chatHistory]);

  return (
    <MainContainer>
      <Aside />
      <MainWrppaer>
        <NowTimeBox>{nowTime}</NowTimeBox>
        <AssistantContainer>
          <Message
            text={BasicManual}
            type="basic"
            children={<Card setActive={setselectChat} active={selectChat} disabled={chatHistory.length > 0} />}
          />
          {showChatOverview}
          {showCategoryDetails}
          {chatHistory.map(({ queries, answers }, index) => (
            <StyledChatHistory key={index}>
              <Message key={`queries_${index}`} text={queries} type="queries" />
              <Message key={`answers_${index}`} text={answers} type="answers" />
            </StyledChatHistory>
          ))}
        </AssistantContainer>
        <Input setState={setChatHistory} disabled={selectChat === ""} />
        <div ref={scrollEndRef}></div>
      </MainWrppaer>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  background-color: #131314;
  width: 100%;
  height: -webkit-fill-available;
  position: absolute;
  top: 0;
  border-radius: 1rem;
  padding-top: 45px;
  display: grid;
  grid-template-columns: 1.5fr 8.5fr;
`;

const MainWrppaer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 20px 0 70px 0;
  scrollbar-width: thin;
  scrollbar-color: #444654 #131314;
`;

const NowTimeBox = styled.div`
  background-color: #4b89d4;
  color: #ffffff;
  border-radius: 20px;
  width: fit-content;
  padding: 4px 12px;
  font-size: 0.625rem;
`;

const AssistantContainer = styled.div`
  width: -webkit-fill-available;
  color: #444444;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
`;

const StyledChatHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
