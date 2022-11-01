import styled from "styled-components";
import Footer from "./Footer";

//Page that display all of our company information
const AboutUs = () => {
  return (
    <>
      <Wrapper>
        <Title>About Us</Title>
        <Description>
          Wearable technology provides us with the ability to monitor our
          fitness levels, track our location with GPS, and view text messages
          more quickly. Best of all, most of the devices that allow us to do
          this are hands free and portable, eliminating the need to take our
          devices out of our pockets.
        </Description>
        <Img src="/assets/wearable.png" alt="wearable-pic" />
        <TeamWrapper>
          <Team>Our Team</Team>
          <Founders>
            <Anchor href="https://github.com/Jack-P-Wheeler">
              Jack Wheeler
            </Anchor>
          </Founders>
          <Founders>
            <Anchor href="https://github.com/fahadbakkar">Fahad Bakkar</Anchor>
          </Founders>
          <Founders>
            <Anchor href="https://github.com/dripsoft7">Jon Go</Anchor>
          </Founders>
        </TeamWrapper>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: black;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border-bottom: 5px solid black;
  border-bottom-style: double;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Description = styled.div`
  word-wrap: break-word;
  width: 700px;
  font-size: 22px;
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;
const Team = styled.h2`
  margin-top: 20px;
  color: black;
  font-size: 37px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border-bottom: 5px solid black;
  border-bottom-style: double;
  margin-bottom: 10px;
`;
const Img = styled.img`
  width: 36%;
  margin-top: 20px;
  border-radius: 8%;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 50px;
`;
const TeamWrapper = styled.div`
  margin-top: 7px;

  /* box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 50px; */
  border-radius: 10px;
  width: 40%;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Anchor = styled.a`
  text-decoration: none;
  color: black;
`;
const Founders = styled.p`
  padding: 5px;
  color: black;
  text-decoration: none;
  font-style: italic;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
export default AboutUs;
