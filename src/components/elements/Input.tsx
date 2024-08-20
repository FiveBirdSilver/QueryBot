import { styled } from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";

const Input = () => {
  return (
    <StyledInputContainer>
      <StyledInput placeholder="질문하기" />
      <StyledInputSubmit />
    </StyledInputContainer>
  );
};

export default Input;

const StyledInputContainer = styled.div`
  width: -webkit-fill-available;
  position: absolute;
  bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px 0 25px;
  gap: 10px;
`;

const StyledInput = styled.input`
  height: 30px;
  width: -webkit-fill-available;
  outline: none;
  border: 1px solid #cdced0;
  border-radius: 4px;
  padding-left: 8px;
  font-size: 0.765rem;

  &::placeholder {
    color: #cdced0;
  }
`;

const StyledInputSubmit = styled(IoPaperPlaneOutline)`
  color: #a4a5a6;
  font-size: 1.45rem;
  margin-top: 0.3rem;
`;
