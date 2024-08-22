import styled from "styled-components";
import { SelectManual } from "utils/constants";

interface CardProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}

const Card = (props: CardProps) => {
  const { active, setActive, disabled } = props;

  return (
    <CardContainer>
      {SelectManual.map((v) => (
        <CardWrapper
          key={v.id}
          $status={active === v.id ? "active" : "inactive"}
          $disabled={disabled ? "disabled" : "abled"}
          onClick={() => setActive(v.id)}
        >
          <CardBox>
            <CardTitle $status={active === v.id ? "active" : "inactive"}>{v.title}</CardTitle>
            <CardContent $status={active === v.id ? "active" : "inactive"}>{v.content}</CardContent>
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
  padding-top: 12px;
  gap: 10px;
`;

const CardWrapper = styled.div<{ $status: "active" | "inactive"; $disabled: "disabled" | "abled" }>`
  display: flex;
  border-radius: 4px;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  cursor: pointer;
  color: #131314;
  background-color: ${(props) => (props.$status === "active" ? "#C3D9FF" : "#343541")};
  pointer-events: ${(props) => (props.$disabled === "disabled" ? "none" : "all")};
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CardTitle = styled.p<{ $status: "active" | "inactive" }>`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${(props) => (props.$status === "active" ? "#1E1F20" : "#FFFFFF")};
`;

const CardContent = styled.p<{ $status: "active" | "inactive" }>`
  font-size: 0.725rem;
  text-align: justify;
  color: ${(props) => (props.$status === "active" ? "#1E1F20" : "#B8B8B8")};
`;
