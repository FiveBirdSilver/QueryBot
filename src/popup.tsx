import { styled } from "styled-components";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Main from "./pages/main";
import useOpen from "./hooks/useOpen";

const Popup = () => {
  const { condition } = useOpen();

  return (
    <PopupContainer condition={condition}>
      <Header />
      <Main />
      <Footer />
    </PopupContainer>
  );
};

export default Popup;

const PopupContainer = styled.div<{ condition: "basic" | "wide" }>`
  position: fixed;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  bottom: 5rem;
  right: 1.25rem;
  left: ${({ condition }) => (condition === "wide" ? "1.25rem" : "auto")};
  width: ${({ condition }) => (condition === "wide" ? "-webkit-fill-available" : "25rem")};
  height: ${({ condition }) => (condition === "wide" ? "85%" : "80%")};
  z-index: 10000;
`;
