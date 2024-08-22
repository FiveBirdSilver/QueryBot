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
      {data.map((v) => (
        <LabelWrapper key={v.id} $status={active === v.id ? "active" : "inactive"} onClick={() => handleClick(v.id)}>
          {v.value}
        </LabelWrapper>
      ))}
    </LabelContainer>
  );
};

export default Label;

const LabelContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  padding-top: 8px;
  gap: 5px;
`;

const LabelWrapper = styled.div<{ $status: "active" | "inactive" }>`
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  font-size: 0.765rem;
  width: max-content;
  color: #1e1f20;
  background-color: ${(props) => (props.$status === "active" ? "#C3D9FF" : "#f3f3f5")};
`;
