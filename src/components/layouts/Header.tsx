import { styled } from "styled-components";
import { RiFullscreenFill, RiCloseLargeLine } from "react-icons/ri";
import { FaMinus } from "react-icons/fa6";
import useOpen from "../../hooks/useOpen";

const Header = () => {
  const { open, setOpen, condition, setCondition } = useOpen();

  return (
    <HeaderContainer>
      <HeaderTitle>GenAIon</HeaderTitle>
      <HeaderIcons>
        {condition === "wide" ? (
          <FaMinus onClick={() => setCondition("basic")} />
        ) : (
          <RiFullscreenFill onClick={() => setCondition("wide")} />
        )}
        <RiCloseLargeLine onClick={() => setOpen(!open)} />
      </HeaderIcons>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  color: #000000;
  background-color: #ffffff;
  border-bottom: 1px solid #ececec;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: relative;
  z-index: 2;
`;

const HeaderTitle = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  svg {
    cursor: pointer;
    font-size: 1.25rem;
    color: #606060;
  }
`;
