import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import ItemCard from "./ItemCard";
import PageSwitch from "./PageSwitch";
import Loader from "./Loader";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";
import GadgetChat from "./GadgetChat";
import Category from "./Category";
import SearchBar from "./SearchBar";

//Displays pages of items based on categories
const Home = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [items, setItems] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const { cart } = useContext(CartContext);

  const [value, setValue] = useState("All");

  //fetching all items from getItems handler
  useEffect(() => {
    fetch("api/get-items")
      .then((res) => res.json())
      .then((data) => setMaxPage(Math.ceil(data.data.length / 20))); //setting maximum amount of pages based on 20 items per page
  }, []);

  //fetch a page of the 20 items listed
  useEffect(() => {
    setHasLoaded(false);
    fetch("/api/get-items-page/" + page + "/" + value)
      .then((res) => res.json())
      .then((data) => {
        setHasLoaded(true);
        setItems(data.data);
      })
      .catch((err) => console.log(err));
  }, [page, value]);

  return (
    <Wrapper>
      {items && <SearchBar suggestions={items} />}
      {!hasLoaded && <Loader />}
      {hasLoaded && (
        <>
          {isAuthenticated && <H3>Welcome Back {user.given_name}!</H3>}
          <Category value={value} setValue={setValue} />
          <ItemsOnPage>
            {items.map((item) => (
              <ItemCard
                key={item._id}
                _id={item._id}
                imageSrc={item.imageSrc}
                name={item.name}
                price={item.price}
                numInStock={item.numInStock}
                inCart={cart}
              />
            ))}
          </ItemsOnPage>
          <PageSwitch page={page} maxPage={maxPage} setPage={setPage} />
        </>
      )}
      <GadgetChat />
      <Footer />
    </Wrapper>
  );
};
const H3 = styled.h3`
  color: black;
`;
const Wrapper = styled.div`
  margin-top: 10px;
  background: var(--color-card);
  text-align: center;
`;
const ItemsOnPage = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  background: var(--color-card);
`;

export default Home;
