import { styled } from "styled-components";
import { RiFullscreenFill, RiCloseLargeLine } from "react-icons/ri";
import useOpen from "../../hooks/useOpen";

const Header = () => {
  const { open, setOpen } = useOpen();

  return (
    <HeaderContaniner>
      <HeaderTitle>GenAIon</HeaderTitle>
      <HeaderIcons>
        <RiFullscreenFill />
        <RiCloseLargeLine onClick={() => setOpen(!open)} />
      </HeaderIcons>
    </HeaderContaniner>
  );
};

export default Header;

const HeaderContaniner = styled.div`
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
  }
`;
