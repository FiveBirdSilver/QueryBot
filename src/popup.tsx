import { styled } from "styled-components";
import Header from "./components/layouts/Header";
import Aside from "./components/layouts/Aside";
import Main from "./pages/main";

const Popup = () => {
  return (
    <PopupContainer>
      <Aside />
      <Header />
      <Main />
    </PopupContainer>
  );
};

export default Popup;

const PopupContainer = styled.div`
  position: fixed;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  bottom: 5rem;
  right: 1.25rem;
  width: 24rem;
  height: 80%;
  z-index: 10000;
`;
