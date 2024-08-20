import { styled } from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";

interface GuideText {
  text: string;
}
const Guide = (props: GuideText) => {
  const { text } = props;
  return (
    <AssistantWrapper>
      <AssistantTitle>
        <AssistantIcons>G</AssistantIcons>
        <span>GenAIon Chatbot</span>
      </AssistantTitle>
      <AssistantContent>{text}</AssistantContent>
    </AssistantWrapper>
  );
};

export default Guide;

const AssistantWrapper = styled.div``;

const AssistantTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;

  span {
    font-size: 0.825rem;
    font-weight: bold;
  }
`;

const AssistantIcons = styled.div`
  background-color: #ececec;
  width: 25px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  padding: 2px 0;
`;

const AssistantContent = styled.p`
  padding-left: 35px;
  font-size: 0.785rem;
  white-space: break-spaces;
`;
