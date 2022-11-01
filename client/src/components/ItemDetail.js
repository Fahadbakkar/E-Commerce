import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";
import Rating from "./Rating";

//Shows a detailed item view and allows a user to add to cart
const ItemDetail = () => {
  let navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const [item, setItem] = useState({});
  const { itemId } = useParams(); //use params for all item ids
  const [counter, setCounter] = useState(1);
  // adding loading spinner, use loading state
  const [loaded, setLoaded] = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();

  //posting on cart
  const handleSubmit = (e) => {
    if (user) {
      const body = {
        id: item._id,
        name: item.name,
        price: item.price.replace(/[^\d.-]/g, ""),
        imageSrc: item.imageSrc,
        quantity: counter,
      };

      setCart([...cart, body]);
      fetch("/api/add-to-cart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({ ...body, userEmail: user.email }),
      })
        .then((res) => res.json())
        .then((res) => {
          navigate("/");
        })
        .catch((error) => {
          console.error("error", error);
        });
    } else {
      loginWithRedirect();
    }
  };
  //counter
  const handleClick = () => {
    if (counter < item.numInStock) setCounter(counter + 1);
  };
  const reducer = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  //fetch specific item
  useEffect(() => {
    fetch(`/api/get-items/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Wrapper>
        {loaded ? (
          item && (
            <ItemWrapper>
              <Image src={item.imageSrc} alt="item-image" />
              <DetailsWrapper>
                <Name>{item.name}</Name>
                <Rating />
                <PriceAlign>
                  <DollarSign>{item.price.slice(0, 1)}</DollarSign>
                  <Price>{item.price.substring(1, item.price.length)}</Price>
                </PriceAlign>
                <Divider />
                <BodyLocation>
                  Where to Wear: <Span>{item.body_location}</Span>
                </BodyLocation>
                <Category>
                  Category: <Span>{item.category}</Span>
                </Category>
                {/* if item stock = 0 then button is out of stock and if stock > 0 then user can add to cart */}
                {item.numInStock > 0 ? (
                  item.numInStock && (
                    <>
                      <Stock>
                        In stock<Span>{item.numInStock}</Span>
                      </Stock>
                      <Counter>
                        Quantity:
                        <CounterNum> {counter} </CounterNum>
                        <Add onClick={handleClick}>
                          <FaPlus
                            style={{
                              width: "13px",
                              height: "13px",
                            }}
                          />
                        </Add>
                        {counter > 0 && (
                          <Reducer onClick={reducer}>
                            <FaMinus
                              style={{
                                width: "13px",
                                height: "13px",
                              }}
                            />
                          </Reducer>
                        )}{" "}
                      </Counter>

                      <Button
                        disabled={cart.some(
                          (cartItem) => cartItem.name === item.name
                        )}
                        onClick={handleSubmit}
                      >
                        Add to Cart
                      </Button>
                    </>
                  )
                ) : (
                  <>
                    <ButtonGhost disabled> Out of Stock</ButtonGhost>
                  </>
                )}
              </DetailsWrapper>
            </ItemWrapper>
          )
        ) : (
          <Loader />
        )}
      </Wrapper>
      <Footer />
    </>
  );
};

const CounterNum = styled.span`
  color: blue;
  font-size: 19px;
`;
const Add = styled.button`
  border: none;
  padding: 0;
  background-color: orange;
  background: none;

  color: black;
  &:hover {
    color: green;
    cursor: pointer;
  }
`;
const Counter = styled.p`
  display: inline-block;
  font-weight: bolder;
`;
const Reducer = styled.button`
  border: none;
  padding: 0;
  margin-left: 5px;
  background-color: orange;
  background: none;

  color: black;
  &:hover {
    color: red;
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  display: flex;
  font-family: "Poppins", sans-serif;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;
const ItemWrapper = styled.div`
  /* border: solid 3px #66a3ff; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55%;

  gap: 50px;
  background-color: var(--color-card);
  padding: 50px 40px;
  /* margin: 10px; */
  border-radius: 8px;
  box-shadow: 5px 15px 31px 4px grey;
`;

const Image = styled.img`
  width: 240px;
  border-radius: 5%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Span = styled.span`
  font-weight: lighter;
  padding-left: 10px;
`;
const Name = styled.span`
  font-size: 27px;
  font-weight: bold;
`;

const Divider = styled.div`
  border-bottom: solid 1px teal;
`;
const PriceAlign = styled.div`
  display: flex;
`;
const DollarSign = styled.div`
  font-size: 17px;
  padding-top: 11px;
`;
const Price = styled.span`
  font-style: italic;
  font-size: 28px;
  margin-bottom: 15px;
  padding-top: 10px;
  /* border-bottom: 1px solid teal; */
  padding-bottom: 10px;
`;

const BodyLocation = styled.span`
  font-size: 19px;

  font-weight: bold;
  padding-top: 25px;
`;

const Category = styled.span`
  font-size: 19px;
  font-weight: bold;
  padding-top: 15px;
`;

const Stock = styled.span`
  font-size: 20px;
  font-weight: bold;
  padding-top: 25px;
  color: green;
  padding-bottom: 30px;
`;

const ButtonGhost = styled.button`
  border-radius: 45%;
  font-weight: bold;
  width: 70%;
  border: none;
  margin-top: 30px;
  background-color: #001433;
  padding: 5px 10px;
`;

const Button = styled.button`
  border-radius: 45%;
  font-weight: bold;
  width: 70%;
  border: none;
  margin-top: 30px;
  background-color: #66a3ff;
  cursor: pointer;
  padding: 5px 10px;
  transition: 0.3s;

  &:hover {
    background-color: #0047b3;
    opacity: 1;
  }
`;
export default ItemDetail;
