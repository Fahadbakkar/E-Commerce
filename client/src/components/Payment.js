import styled from "styled-components";
import { BsPaypal } from "react-icons/bs";
import { RiVisaLine } from "react-icons/ri";
import { RiMastercardFill } from "react-icons/ri";
import { AiOutlineCreditCard } from "react-icons/ai";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  let navigate = useNavigate();
  const { amount, setCart, setAmount } = useContext(CartContext);
  const { user } = useAuth0();
  const [check, setCheck] = useState(false);
  const [uncheck, setUncheck] = useState(false);
  const handleClick = () => {
    setCheck(true);
    setUncheck(false);
  };
  const click = () => {
    setCheck(false);
    setUncheck(true);
  };
  const finish = () => {
    fetch(`/api/Checkout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    })
      //alert user that they've succesfully checked out and bought items
      .then((res) => res.json())
      .then((res) => {
        navigate("/");
        setCart([])(setAmount(0));
      })

      .catch((error) => {
        console.error("error", error);
      });
  };
  let totalPrice = amount * 0.15;
  let newTotal = totalPrice + amount + 8;
  return (
    <Wrapper>
      <Paymentdiv>
        <H2>Payment Method</H2>
        <MethodDiv>
          <InputDiv>
            <input
              type="radio"
              style={{ color: "blue", backgroundColor: "blue" }}
              checked={check === true}
              onClick={handleClick}
            ></input>
            <label>
              {" "}
              <BsPaypal style={{ color: "blue" }} />
            </label>
          </InputDiv>
          <Carddiv>
            <input
              type="radio"
              checked={uncheck === true}
              onClick={click}
            ></input>
            <Card>Credit or Debit Card</Card>
            <RiMastercardFill
              style={{ marginLeft: "40%", fontSize: "30px", color: "red" }}
            />
            <RiVisaLine
              style={{ marginLeft: "1%", fontSize: "30px", color: "blue" }}
            />
          </Carddiv>
          <NumberDiv>
            <Cardlabel>Card number</Cardlabel>
            <Input
              required
              type="numbers"
              placeholder=" 💳 0000 0000 0000 0000"
              style={{ fontSize: "17px" }}
            />
            <Div>
              <Exp>
                <Cardlabel>Expiry date</Cardlabel>
                <EInput
                  required
                  type="text"
                  placeholder="📅 MMYY"
                  style={{ fontSize: "17px" }}
                />
              </Exp>
              <Cvv>
                <Cardlabel>CVC/CVV</Cardlabel>
                <CInput
                  required
                  type="password"
                  placeholder="🔒 ..."
                  style={{ fontSize: "17px" }}
                />
              </Cvv>
            </Div>
          </NumberDiv>
        </MethodDiv>
      </Paymentdiv>
      <SummaryDiv>
        <H2>Summary</H2>
        <Total>
          <Amount>
            <H1>Amount:</H1>
            <H3>${amount}</H3>
          </Amount>
          <Amount>
            <H3> Tax</H3>
            <H3>+15%</H3>
          </Amount>
          <Amount>
            <H3> Shipping</H3>
            <H3> +$8</H3>
          </Amount>
          <Price>
            <TotalAmount>Total: </TotalAmount>
            <H3>${newTotal}</H3>
          </Price>
          <ButtonDiv>
            <Button onClick={finish}>Place Order</Button>
          </ButtonDiv>
        </Total>
      </SummaryDiv>
    </Wrapper>
  );
};
const ButtonDiv = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  border: 1px solid beige;
  border-radius: 5px;
  background: none;
  color: black;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;
const TotalAmount = styled.h1`
  color: black;
`;
const Price = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding-top: 5px;
  padding-bottom: 5px;
`;
const H3 = styled.h2`
  color: black;
`;
const Amount = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid beige;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 2rem;
`;
const H1 = styled.h1`
  color: black;
`;
const Total = styled.div`
  border-bottom: 1px solid beige;
  border-radius: 5px;
  width: 200%;
  height: 50vh;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #f6b79f;
`;
const EInput = styled.input`
  height: 25px;
  margin-right: 1rem;
`;
const CInput = styled.input`
  height: 25px;
`;
const Div = styled.div`
  display: flex;
`;
const Cvv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 2rem;
`;
const Exp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 2rem;
`;
const Input = styled.input`
  border: 1px solid beige;
  height: 15%;
  border-radius: 7px;
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;
const NumberDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 2rem;
`;
const Cardlabel = styled.label`
  color: black;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const Carddiv = styled.div`
  display: flex;
  align-items: center;
`;
const Card = styled.label`
  color: black;
  font-size: 19px;
  font-weight: 400;
  margin-left: 1rem;
`;
const InputDiv = styled.div`
  border-bottom: 1px solid beige;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const MethodDiv = styled.div`
  border: 1px solid beige;
  border-radius: 5px;
  width: 125%;
  height: 50vh;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #f6b79f;
`;
const SummaryDiv = styled.div`
  margin-right: 30%;
  padding-top: 5px;
`;
const H2 = styled.h2`
  color: black;
`;
const Paymentdiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 5%;
  padding-top: 5px;
`;
const Wrapper = styled.div`
  background-color: beige;
  border-radius: 5px;
  width: 75%;
  margin-left: 15%;
  height: 75vh;
  display: flex;
  justify-content: space-between;
`;

export default Payment;
