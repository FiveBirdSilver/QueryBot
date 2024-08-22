import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoArrowUpCircle } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";

interface InputProps {
  disabled: boolean;
  setState: React.Dispatch<React.SetStateAction<{ queries: string; answers: string }[]>>;
}

const Input = (props: InputProps) => {
  const { disabled, setState } = props;
  const [value, setValue] = useState<string>("");

  const handleOnSubmit = () => {
    if (value.trim() === "") return null;
    else {
      setState((prev) => [...prev, { queries: value, answers: "" }]);
      setValue("");
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // 한글은 자음과 모음의 조합으로 끝난상태인지 파악하기 어렵기 때문에 방어 필요
    if (event.nativeEvent.isComposing) return;

    if (event.code === "Enter") {
      event.preventDefault();
      handleOnSubmit();
    }
  };

  return (
    <StyledInputContainer>
      <StyledAddFileIcon />
      <StyledInputWrppaer>
        <StyledInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleOnKeyDown(e)}
          disabled={disabled}
          placeholder="질문하기"
        />
        <StyledSubmitIcon onClick={handleOnSubmit} />
      </StyledInputWrppaer>
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
  padding: 0 20px;
  gap: 10px;
`;

const StyledInputWrppaer = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: 9fr 1fr;
  align-items: center;
  background-color: #1e1f20;
  border-radius: 4px;
`;

const StyledInput = styled(TextareaAutosize)`
  width: -webkit-fill-available;
  outline: none;
  border: none;
  color : #cdced0;
  padding: 10px;
  resize : none;
  font-size: 0.765rem;
  max-height : 150px;
  background-color: transparent;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #444654 #1e1f20;

  &::placeholder {
    color: #cdced0;
  }
  f
`;

const StyledAddFileIcon = styled(AiOutlinePlusCircle)`
  color: #444654;
  font-size: 1.45rem;
  margin-top: 0.3rem;
  cursor: pointer;
`;

const StyledSubmitIcon = styled(IoArrowUpCircle)`
  color: #4b89d4;
  font-size: 1.45rem;
  cursor: pointer;
`;
