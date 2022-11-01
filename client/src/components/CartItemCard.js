import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

//Shows a view of an individual item in the users cart, including the ui for it's deletion
const CartItemCard = ({
  id,
  imageSrc,
  name,
  price,
  numInStock,
  quantity,
  handleRemove,
}) => {
  return (
    //return item name, stock, price and quantity in users cart
    <CartItemCardDiv>
      <Wrapper to={"/itemDetail/" + id}>
        <RemoveItem
          onClick={(ev) => {
            ev.preventDefault();
            handleRemove(id);
          }}
        >
          <FiX />
        </RemoveItem>{" "}
        <DeleteText>Delete</DeleteText>
        <ItemInfo>
          <ItemName>{name}</ItemName>
          <ItemPic src={imageSrc} inStock={numInStock} />
          <ItemPrice>{"$" + price}</ItemPrice>
          <ItemQuantity>Quantity: {quantity}</ItemQuantity>
        </ItemInfo>
      </Wrapper>
    </CartItemCardDiv>
  );
};

const CartItemCardDiv = styled.div`
  display: flex;
`;
const Wrapper = styled(Link)`

  width: 500px;
  height: 350px;
  margin: 20px;
  background-color: var(--color-card);

  filter: drop-shadow(0 2px 5px hsla(360, 100%, 0%, 0.5));

  border-radius: 10px;
  padding: 5px;
  margin: 10px;

  text-decoration: none;
  color: var(--color-paragraph);
  &:hover {
    filter: drop-shadow(0 5px 7px hsla(360, 100%, 0%, 0.5));
  }
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const ItemName = styled.p`
  font-weight: bold;
  font-size: 20px;
`;
const DeleteText = styled.span`
  font-size: 20px;
  margin-left: 5px;
  opacity: 0.7;
`;
const ItemPic = styled.img`
  padding-top: 20px;
  margin: auto;
  display: block;
  max-height: 300px;
  width: auto;
  border-radius: 20%;
`;
const ItemPrice = styled.p`
  font-size: 26px;
  font-weight: bold;
`;
const ItemQuantity = styled.p`
  margin-top: 5px;
`;
const RemoveItem = styled.button`

  color: black;
  height: 40px;
  background-color: lightgrey;
  border: 1px solid grey;
  border-radius: 10px;
  margin-bottom: 5px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 50px;

  &:hover {
    color: red;
    cursor: pointer;
  }
`;
export default CartItemCard;
