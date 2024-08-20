import { styled } from "styled-components";
import { MdQuestionMark } from "react-icons/md";
import { SelectManual } from "utils/AssistantManual";

interface Card {
  data: string[];
  // setState: React.Dispatch<React.SetStateAction<string>>;
}

const Label = (props: Card) => {
  const { data } = props;

  return (
    <LabelContainer>
      <LabelContent>추천카테고리</LabelContent>
      <LabelContainer>
        {data.map((v) => (
          // <LabelWrapper active={active === v.id} onClick={() => setState(v.id)}>
          <LabelWrapper>{v}</LabelWrapper>
        ))}
      </LabelContainer>
    </LabelContainer>
  );
};

export default Label;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LabelWrapper = styled.div`
  border: 1px solid #f3f3f4;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  font-size: 0.785rem;
  width: max-content;
`;

const LabelContent = styled.p`
  font-size: 0.785rem;
`;
