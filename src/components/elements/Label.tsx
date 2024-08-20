import { styled } from "styled-components";

interface CardProps {
  data: {
    id: string;
    value: string;
    text: string;
  }[];
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const Label = (props: CardProps) => {
  const { data, active, setActive } = props;

  const handleClick = (value: string) => {
    setActive(value);
  };

  return (
    <LabelContainer>
      <LabelContent>추천 카테고리</LabelContent>
      <LabelContainer>
        {data.map((v) => (
          <LabelWrapper key={v.id} $status={active === v.id ? "active" : "inactive"} onClick={() => handleClick(v.id)}>
            {v.value}
          </LabelWrapper>
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

const LabelWrapper = styled.div<{ $status: "active" | "inactive" }>`
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  font-size: 0.785rem;
  width: max-content;
  border: ${(props) => (props.$status === "active" ? "1px solid #9747FF" : "1px solid #f3f3f4")};
`;

const LabelContent = styled.p`
  font-size: 0.785rem;
`;
