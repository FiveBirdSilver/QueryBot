import { styled } from "styled-components";
import { MdQuestionMark } from "react-icons/md";
import { SelectManual } from "utils/AssistantManual";

interface Card {
  active: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const Card = (props: Card) => {
  const { active, setState } = props;

  return (
    <CardContainer>
      <CardContent>Select Assistant or chat</CardContent>
      {SelectManual.map((v) => (
        <CardWrapper active={active === v.id} onClick={() => setState(v.id)}>
          <MdQuestionMark fontSize={24} />
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
`;

const CardWrapper = styled.div<{ active: boolean }>`
  display: grid;
  grid-template-columns: 1.5fr 8.5fr;
  border: 1px solid #f3f3f4;
  border-radius: 4px;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  border: ${({ active }) => (active ? "1px solid #9747FF" : "1px solid #f3f3f4")};
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CardTitle = styled.p`
  font-size: 0.925rem;
  font-weight: bold;
`;

const CardContent = styled.p`
  font-size: 0.785rem;
`;
