import styled from "styled-components";
import { Link } from "react-router-dom";

//item card in home page
const ItemCard = ({ _id, imageSrc, name, price, numInStock }) => {
  return (
    //display item name, stock , price and quantity left
    <Wrapper to={"/itemDetail/" + _id}>
      <ItemName>{name}</ItemName>
      <ItemPic src={imageSrc} inStock={numInStock} />
      <ItemPrice>{price}</ItemPrice>
      {/* conditional to show limited amount left in stock */}
      {numInStock <= 3 && numInStock > 0 && (
        <StockNotification>Only {numInStock} left</StockNotification>
      )}
      {numInStock === 0 && <StockNotification>Out of stock</StockNotification>}
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  margin-top: 30px;
  margin-left: 60px;
  width: 200px;
  height: 300px;
  background-color: white;
  filter: drop-shadow(0 2px 5px hsla(360, 100%, 0%, 0.5));

  border-radius: 10px;
  padding: 5px;

  text-decoration: none;
  color: var(--color-paragraph);
  &:hover {
    transform: scale(1.1);
  }
`;
const ItemName = styled.p``;
const ItemPic = styled.img`
  margin: auto;
  display: block;
  max-height: 300px;
  width: auto;
  filter: ${(props) => (!props.inStock ? "grayscale(100)" : "none")};
`;
const ItemPrice = styled.p`
  font-size: 26px;
  font-weight: bold;
`;
const StockNotification = styled.p``;

export default ItemCard;
