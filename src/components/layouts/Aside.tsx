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
      <FaCircleQuestion />
    </AisdeContaniner>
  );
};

export default Aside;

const AisdeContaniner = styled.div.attrs<{ condition: "basic" | "wide" }>((props) => ({
  style: {
    alignItems: props.condition ? "start" : "center",
  },
}))<{ condition: "basic" | "wide" }>`
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  background-color: #f3f3f4;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 0 0 25px 5px;
  border-radius: 0.3rem;
  color: #cdced0;
  font-size: 1rem;
  padding: 15px;

  svg {
    cursor: pointer;
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
