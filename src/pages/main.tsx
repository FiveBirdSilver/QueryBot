import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { styled } from "styled-components";

import Input from "../components/elements/Input";
import Aside from "../components/layouts/Aside";
import { BasicManual, QnaManual, QueryManual, InsightManual } from "../utils/AssistantManual";
import Guide from "components/elements/Guide";
import Card from "components/elements/Card";
import Label from "components/elements/Label";

const Main = () => {
  const nowTime = dayjs().format("YYYY. M. D hh:mm A");
  const [selectChat, setselectChat] = useState<string>("");

  const showSelectChat = useMemo(() => {
    if (selectChat === "qna")
      return (
        <>
          <Guide text={QnaManual.text} />
          <Label data={QnaManual.category} />
        </>
      );
    if (selectChat === "query")
      return (
        <>
          <Guide text={QueryManual.text} />
          <Label data={QueryManual.category} />
        </>
      );
    if (selectChat === "insight")
      return (
        <>
          <Guide text={InsightManual.text} />
          <Label data={InsightManual.category} />
        </>
      );
  }, [selectChat]);

  return (
    <MainContainer>
      <Aside />
      <MainWrppaer>
        <NowTimeBox>{nowTime}</NowTimeBox>
        <AssistantContainer>
          <Guide text={BasicManual} />
          <Card setState={setselectChat} active={selectChat} />
          {showSelectChat}
        </AssistantContainer>
        <Input />
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
  gap: 20px;
`;
