import { styled } from "styled-components";
import dayjs from "dayjs";

const Main = () => {
  const nowTime = dayjs().format("YYYY. M. D hh:mm A");

  return (
    <MainContainer>
      <MainWrppaer>
        <NowTimeBox>{nowTime}</NowTimeBox>
      </MainWrppaer>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  top: 0;
  border-radius: 1rem;
`;

const MainWrppaer = styled.div`
  width: 100%;
  margin: 60px 10px 10px 65px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NowTimeBox = styled.div`
  background-color: #cdced0;
  color: #ffffff;
  border-radius: 20px;
  width: fit-content;
  padding: 4px 12px;
  font-size: 0.725rem;
`;
