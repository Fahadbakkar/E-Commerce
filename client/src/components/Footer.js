import styled from "styled-components";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillApple,
} from "react-icons/ai";
import { Link } from "react-router-dom";

import { FaGooglePlay } from "react-icons/fa";

//Displays social information for the store
const Footer = () => {
  return (
    <WrapperFooter>
      <Div>
        <FooterInfo>
          <FooterTitle>Gadget Group</FooterTitle>
          <Sub>
            <SubTextWrapper>
              <SubTitle>Company</SubTitle>
              <Text>About Us</Text>
              <Text>Blog</Text>
            </SubTextWrapper>
            <SubTextWrapper>
              <SubTitle>Techs</SubTitle>
              <Text>Code of Conduct</Text>
              <Text>Community</Text>
            </SubTextWrapper>
            <SubTextWrapper>
              <SubTitle>Locations</SubTitle>
              <Text>Wearables</Text>
              <Text>Business</Text>
            </SubTextWrapper>
            <SubTextWrapper>
              <SubTitle>For You</SubTitle>
              <Text>Privacy</Text>
              <Text>Security</Text>
              <Text>Terms of Service</Text>
            </SubTextWrapper>
            <SocialLinks>
              <SubTitle>Social Links</SubTitle>
              <div>
                <AiFillFacebook />
                <AiFillTwitterCircle />
                <AiFillInstagram />
              </div>
              <div>
                <AiFillApple />
                <FaGooglePlay />
              </div>
            </SocialLinks>
          </Sub>
        </FooterInfo>
      </Div>
      <ImgDiv>
        <Img src="/assets/default.png" alt="logo" />
      </ImgDiv>
    </WrapperFooter>
  );
};

const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;
const WrapperFooter = styled.div`
  position: relative;
  margin-top: 30px;
  background-color: #f5f5f5;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  border-bottom: 1px solid lightgrey;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  text-align: left;
  margin: 10px;
`;

const FooterTitle = styled.h1`
  font-size: 20px;
  color: black;
  margin-bottom: 20px;
  margin-top: 10px;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 8px;
`;

const Sub = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const SubTextWrapper = styled.p``;

const SocialLinks = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Text = styled.p`
  margin-top: 8px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const SubTitle = styled.p`
  font-weight: bold;
  font-size: 19px;
  padding-bottom: 5px;
`;

export default Footer;
