import { useContext } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import Loader from "./Loader";
import { useAuth0 } from "@auth0/auth0-react";
import CartItemCard from "./CartItemCard";
import { Link, useNavigate } from "react-router-dom";
import Category from "./Category";
import Checkout from "./Checkout";

//Displays the cart of a logged in user
const Cart = () => {
  let navigate = useNavigate();
  const { cart, setCart, loaded, setAmount, amount } = useContext(CartContext);

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  //post checkout items in db
  const handleClick = () => {
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
        setCart([]);
      })

      .catch((error) => {
        console.error("error", error);
      });
  };
  //remove item handle from cart
  const handleRemove = (id) => {
    console.log("Removed " + id + " from cart.");
    setCart(cart.filter((cartItem) => cartItem.id !== id));
    fetch("/api/remove-from-cart", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: user.email, itemId: id }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  //get total cost
  let totalAmount = 0;
  const total = cart.forEach((item) => {
    if (item.price) {
      totalAmount = totalAmount + Number(item.price);
      setAmount(totalAmount);
    }
  });
  console.log(amount);
  return loaded ? (
    <>
      <Wrapper>
        <Checkoutdiv>
          <H1>Cart</H1>
          {/* show checkout button once they've added at least 1 item  to cart */}
          {cart.length > 0 && <Button to="/checkout">Checkout</Button>}
        </Checkoutdiv>
        {cart.length > 0 ? (
          <>
            <CartContents>
              {cart.map((item) => {
                return (
                  <CartItemCard
                    key={item.id}
                    id={item.id}
                    imageSrc={item.imageSrc}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    handleRemove={handleRemove}
                  />
                );
              })}
            </CartContents>
            <P>Your total: {totalAmount}</P>
          </>
        ) : (
          <>
            <H2>Cart is empty </H2>
            <h3>&#x1F611;</h3>
          </>
        )}
      </Wrapper>
    </>
  ) : (
    <Loader />
  );
};
const P = styled.p`
  margin-top: 300px;
  margin-left: 1100px;
  font-weight: bolder;
  font-size: 30px;
`;
const H2 = styled.h1`
  color: black;
`;
const HomeDiv = styled.div`
  display: flex;
`;
const Checkoutdiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
const Button = styled(Link)`
  text-decoration: none;
  padding-top: 1.5%;
  color: black;
  margin-left: 500px;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 50px;
  padding: 0px;
  padding-left: 6px;
  padding-right: 6px;
  background-color: var(--color-card);
  font-weight: bold;
  font-size: 25px;
  height: 40px;
  transition: 0.3s;
  opacity: 0.8;
  &:hover {
    background-color: teal;
    opacity: 1;
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 60%;
  margin-top: 2%;
  margin-left: 20%;
`;
const H1 = styled.h1`
  color: black;
  font-family: poppins;
  font-weight: bolder;

  border-bottom: 2px blue solid;

  width: 100px;
  font-weight: 100;
`;
const CartContents = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Cart;
