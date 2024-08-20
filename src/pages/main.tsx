import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { styled } from "styled-components";

import Input from "components/elements/Input";
import Aside from "components/layouts/Aside";
import Message from "components/elements/Message";
import Card from "components/elements/Card";
import Label from "components/elements/Label";
import useChatType from "hooks/useChatType";
import { BasicManual } from "utils/AssistantManual";

const Main = () => {
  const nowTime = dayjs().format("YYYY. M. D hh:mm A");
  // 챗봇 타입
  const [selectChat, setselectChat] = useState<string>("");
  // 카테고리 타입
  const [selectCategory, setselectCategory] = useState<string>("");

  // 사용자 프롬포트
  const [conversation, setConversation] = useState<{ queries: string; answers: string }[]>([]);

  const chatType = useChatType(selectChat);

  // qna / query / insight 선택하면 설명 + 추천 카테고리 보여주는 함수
  const showChatOverview = useMemo(() => {
    if (!chatType) return null;

    return (
      <>
        <Message text={chatType.text} type="chat" />
        <Label data={chatType.category} active={selectCategory} setActive={setselectCategory} />
      </>
    );
  }, [selectChat, selectCategory, setselectCategory]);

  // 카테고리 선택하면 설명 보여주는 함수
  const showCategoryDetails = useMemo(() => {
    if (!chatType) return null;

    const tmpMsg = chatType.category.find((v) => v.id === selectCategory)?.text;

    if (tmpMsg) return <Message text={tmpMsg} type="chat" />;
  }, [selectCategory, setselectCategory]);

  console.log(selectChat);
  return (
    <MainContainer>
      <Aside />
      <MainWrppaer>
        <NowTimeBox>{nowTime}</NowTimeBox>
        <AssistantContainer>
          <Message text={BasicManual} type="chat" />
          <Card setActive={setselectChat} active={selectChat} />
          {showChatOverview}
          <div>
            {showCategoryDetails}
            {/* 생각해보니까 굳이 나눌 필요 있나..?  */}
            {conversation.map(({ queries, answers }) => (
              <Message text={queries} type="user" />
            ))}
          </div>
        </AssistantContainer>
        <Input setState={setConversation} disabled={selectChat === ""} />
      </MainWrppaer>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: -webkit-fill-available;
  position: absolute;
  top: 0;
  border-radius: 1rem;
  padding-top: 60px;
  display: grid;
  grid-template-columns: 1.5fr 8.5fr;
`;

const MainWrppaer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-bottom: 70px;

  scrollbar-width: thin;
  scrollbar-color: #cdced0 #ffffff;
`;

const NowTimeBox = styled.div`
  background-color: #cdced0;
  color: #ffffff;
  border-radius: 20px;
  width: fit-content;
  padding: 4px 12px;
  font-size: 0.625rem;
`;

const AssistantContainer = styled.div`
  padding: 10px;
  color: #444444;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
