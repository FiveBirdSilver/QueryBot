import { styled } from "styled-components";
import { FaRegSquarePlus, FaCircleQuestion } from "react-icons/fa6";

const Aside = () => {
  return (
    <AisdeContaniner>
      <StyledAddChatIcon />
      <StyledQuesetionIcon />
    </AisdeContaniner>
  );
};

export default Aside;

const AisdeContaniner = styled.div`
  position: absolute;
  height: 100%;
  background-color: #f3f3f4;
  z-index: 1;
  width: 3.5rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const StyledAddChatIcon = styled(FaRegSquarePlus)`
  cursor: pointer;
  color: #cdced0;
  margin-top: 65px;
  font-size: 1.25rem;
`;

const StyledQuesetionIcon = styled(FaCircleQuestion)`
  cursor: pointer;
  color: #cdced0;
  margin-bottom: 20px;
  font-size: 1.25rem;
`;
