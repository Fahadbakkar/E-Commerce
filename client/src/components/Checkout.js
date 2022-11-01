import { Link } from "react-router-dom";
import styled from "styled-components";
const Checkout = () => {
  return (
    <Main>
      <Wrapper>
        <div>
          <Labeldiv>
            <Label>Contact Information</Label>
            <EInput
              type="email"
              name="email"
              placeholder="john@example.com"
            ></EInput>
          </Labeldiv>
        </div>

        <Labeldiv>
          <AddLabel>Shipping Address</AddLabel>
          <NameDiv>
            <FirstInput
              type="text"
              name="firstname"
              placeholder="First name"
            ></FirstInput>

            <Input type="text" name="lastname" placeholder="Last name"></Input>
          </NameDiv>
        </Labeldiv>

        <Labeldiv>
          <AddInput
            type="text"
            name="fullAddress"
            placeholder="Address"
          ></AddInput>
        </Labeldiv>
        <Labeldiv>
          <ApInput
            type="text"
            name="Appartment"
            placeholder="Appartment,suite, etc (optional"
          ></ApInput>
        </Labeldiv>
        <Labeldiv>
          <CInput type="text" name="city" placeholder="City"></CInput>
        </Labeldiv>

        <Labeldiv>
          <PDiv>
            <Input type="text" name="Country" placeholder="Country"></Input>
            <Input
              type="text"
              name="postalcode"
              placeholder="Postal code"
            ></Input>
          </PDiv>
        </Labeldiv>

        <Button type="submit" to="/checkout/payment">
          Continue To Payment
        </Button>
      </Wrapper>
    </Main>
  );
};
const Main = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f6b79f;
`;
const ApInput = styled.input`
  width: 65.5%;
  height: 20%;
  border: 1px solid black;
  margin-bottom: 1rem;
  border-radius: 5px;
  &:focus {

    outline:none;

     border-color: #9ecaed
     box-shadow: 0 0 10px #9ecaed
  }
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;
const PDiv = styled.div`
  margin-right: 1rem;

  margin-bottom: 1rem;
`;
const CInput = styled.input`
  width: 65.5%;
  height: 20%;
  border: 1px solid black;
  margin-bottom: 1rem;
  border-radius: 5px;
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;
const AddInput = styled.input`
  width: 65.5%;
  height: 20%;
  border: 1px solid black;
  margin-bottom: 1rem;
  border-radius: 5px;
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;
const FirstInput = styled.input`
  margin-right: 1rem;
  border: 1px solid black;
  margin-bottom: 1rem;
  height: 20%;
  border-radius: 5px;
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;
const AddLabel = styled.label`
  margin-top: 2rem;
  color: black;
  font-size: 20px;
  font-weight: bold;
`;
const NameDiv = styled.div`
  display: flex;
  margin-top: 1rem;
`;
const EInput = styled.input`
  width: 65.5%;
  height: 10%;
  border: 1px solid black;
  margin-top: 1rem;
  border-radius: 5px;
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;
const Buttondiv = styled.div`
  margin-left: 70%;
  margin-top: 10%;
`;
const Button = styled(Link)`
  text-decoration: none;
  color: white;
  text-align: center;
  display: table-cell;
  padding-top: 1.5%;
  vertical-align: middle;
  background-color: blue;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  height: 3rem;
  width: 30%;
  margin-left: 13rem;
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;
const Paydiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const ContactDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const PaymentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Labeldiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Input = styled.input`
  border: 1px solid black;
  margin-right: 1rem;
  height: 15%;
  border-radius: 5px;
  :focus {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;

const Label = styled.label`
  color: black;
  font-size: 20px;
  font-weight: bold;
`;
const Wrapper = styled.div`
  width: 40%;

  margin-left: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid blue;
  background-color: beige;
  padding: 5px;
  border-radius: 5px;
  padding-left: 2%;
`;
export default Checkout;
