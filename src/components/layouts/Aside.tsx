import { styled } from "styled-components";
import { FaRegSquarePlus, FaCircleQuestion } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { GrHistory } from "react-icons/gr";

import useOpen from "../../hooks/useOpen";

const Aside = () => {
  const { condition } = useOpen();

  return (
    <AisdeContaniner condition={condition}>
      <AsideWrapper>
        {condition === "wide" ? (
          <>
            <StyleMenu>
              <FaRegSquarePlus />
              <p>New Chat</p>
            </StyleMenu>
            <StyleMenu>
              <GrHistory />
              <p>History</p>
              <StyleArrowIcons />
            </StyleMenu>
          </>
        ) : (
          <>
            <FaRegSquarePlus />
            <GrHistory />
          </>
        )}
      </AsideWrapper>
      <FaCircleQuestion color="#4B89D4" />
    </AisdeContaniner>
  );
};

export default Aside;

const AisdeContaniner = styled.div.attrs<{ condition: "basic" | "wide" }>((props) => ({
  style: {
    alignItems: props.condition === "wide" ? "start" : "center",
  },
}))<{ condition: "basic" | "wide" }>`
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  background-color: #1e1f20;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: #ffffff;
  font-size: 1rem;
  padding: 15px 10px;
  border-bottom-left-radius: 1rem;

  svg {
    cursor: pointer;
    font-size: 18px;
  }
`;

const AsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  align-items: center;
`;

const StyleMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  width: 100%;
`;

const StyleArrowIcons = styled(IoIosArrowDown)`
  position: absolute;
  right: 0;
`;
