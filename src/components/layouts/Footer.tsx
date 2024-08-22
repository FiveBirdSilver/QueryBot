import { styled } from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>This product may show inaccurate or offensive information.</FooterText>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 0.575rem;
  z-index: 1;
  background-color: #131314;
  width: 100%;
  text-align: center;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  margin: auto;
  padding: 6px 0;
  color: #444654;
`;

const FooterText = styled.p`
  padding-left: 1rem;
`;
