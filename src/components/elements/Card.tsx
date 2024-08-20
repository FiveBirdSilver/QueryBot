import styled from "styled-components";
import { SelectManual } from "utils/AssistantManual";

interface CardProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const Card = (props: CardProps) => {
  const { active, setActive } = props;

  return (
    <CardContainer>
      <CardContent>Select Assistant or chat</CardContent>
      {SelectManual.map((v) => (
        <CardWrapper key={v.id} $status={active === v.id ? "active" : "inactive"} onClick={() => setActive(v.id)}>
          <CardBox>
            <CardTitle>{v.title}</CardTitle>
            <CardContent>{v.content}</CardContent>
          </CardBox>
        </CardWrapper>
      ))}
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #444444;
`;

const CardWrapper = styled.div<{ $status: "active" | "inactive" }>`
  display: flex;
  border: 1px solid #f3f3f4;
  border-radius: 4px;
  align-items: center;
  padding: 6px 8px;
  margin: 0 10px;
  cursor: pointer;
  border: ${(props) => (props.$status === "active" ? "1px solid #9747FF" : "1px solid #f3f3f4")};
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CardTitle = styled.p`
  font-size: 0.875rem;
  font-weight: bold;
`;

const CardContent = styled.p`
  font-size: 0.785rem;
`;
