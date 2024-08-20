import { styled } from "styled-components";

interface MessageProps {
  type: "user" | "chat";
  text: string;
}

const Message = (props: MessageProps) => {
  const { type, text } = props;
  return (
    <AssistantWrapper $type={type}>
      <AssistantTitle>
        <AssistantIcons>{type === "chat" ? "G" : "U"}</AssistantIcons>
        <span>{type === "chat" ? "GenAIon Chatbot" : "YOU"}</span>
      </AssistantTitle>
      <AssistantContent>{text}</AssistantContent>
    </AssistantWrapper>
  );
};

export default Message;

const AssistantWrapper = styled.div<{ $type: "user" | "chat" }>`
  color: #444444;
  padding: 15px 5px;
  background-color: ${(props) => (props.$type === "chat" ? "#FFFFFF" : "#F6F6F7")};
`;

const AssistantTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 3px;

  span {
    font-size: 0.825rem;
    font-weight: bold;
  }
`;

const AssistantIcons = styled.div`
  background-color: #ececec;
  width: 25px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  padding: 2px 0;
  margin-top: 5px;
`;

const AssistantContent = styled.p`
  padding-left: 35px;
  font-size: 0.785rem;
  white-space: break-spaces;
`;
