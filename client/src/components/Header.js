import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import UserToggle from "./UserToggle";

//Adds a header that contains links to Home, cart, and login/logout
const Header = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { cart } = useContext(CartContext);
  return (
    <Wrapper>
      <Div>
        <Img src="/assets/default.png" alt="logo" />
        <Title to="/">Gadgets Galore!</Title>
      </Div>
      <AboutDiv>
        {/* if user is logged in or created, they can see cart button  */}
        {isAuthenticated && (
          <Cart to="/cart">
            Cart
            <AiOutlineShoppingCart />
          </Cart>
        )}

        <AboutUsText to="/aboutUs">About Us</AboutUsText>
        <UserToggle />
      </AboutDiv>
    </Wrapper>
  );
};
const AboutDiv = styled.div`
  display: flex;
  align-items: center;
`;
const AboutUsText = styled(Link)`
  margin-left: 10px;
  margin-right: 14px;
  text-decoration: none;
  font-size: 30px;
  font-weight: bold;
  color: var(--color-headline);
  &:hover {
    border-bottom: 1px solid black;
  }
`;
const CartDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15pxpx;
`;
const Img = styled.img`
  height: 50px;
  margin-left: 5px;
  border-radius: 50%;
`;

const Span = styled.span`
  display: inline-block;
`;
const Div = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 5%;
  color: var(--color-headline);
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
const Title = styled(Link)`
  font-size: 32px;
  color: var(--color-headline);
  font-weight: bold;
  text-decoration: none;
  margin-left: 10px;
`;
const Cart = styled(Link)`
  display: flex;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: var(--color-headline);

  &:hover {
    border-bottom: 1px solid black;
  }
`;

export default Header;
