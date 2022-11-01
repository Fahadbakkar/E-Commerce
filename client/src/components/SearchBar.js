import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//A typeahead that lets users search for specific items
const SearchBar = ({ suggestions }) => {
  const [value, setValue] = useState(""); //value is the word being entered in search bar
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0); //for highlighting the suggestion with mouse/keyboard
  const [dropDownVisible, setDropDownVisible] = useState(true);

  const navigate = useNavigate();

  let firstHalf = "";
  let secondHalf = "";
  let stringIndex = 0;

  //creates new array of suggestions that match the user's search value
  let matchedSuggestions = suggestions
    .filter((product) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    })
    .slice(0, 4); //only stores the first 4 search results

  //keyboard keys up and down
  const handleKeyPress = (e) => {
    setDropDownVisible(true);
    switch (e.key) {
      case "Enter": {
        if (matchedSuggestions.length !== 0 && e.target.value.length !== 0) {
          navigate(
            `/itemDetail/${matchedSuggestions[selectedSuggestionIndex]._id}`
          );
        }
        return;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (
          selectedSuggestionIndex > 0 &&
          matchedSuggestions.length !== 0 &&
          dropDownVisible
        ) {
          setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
        }
        return;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (
          selectedSuggestionIndex < matchedSuggestions.length - 1 &&
          matchedSuggestions.length !== 0 &&
          dropDownVisible
        ) {
          setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
        }
        return;
      }
      case "Escape": {
        setDropDownVisible(false);
        return;
      }
    }
  };

  return (
    <Wrapper>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
        placeholder="Search"
      />
      {/* search results are mapped when user enters at least two letters that produces matches */}
      {value.length >= 2 && matchedSuggestions.length > 0 && (
        <ProductList isShown={dropDownVisible}>
          {matchedSuggestions.map((product, index) => {
            const isSelected = selectedSuggestionIndex === index ? true : false;

            //for highlighting the part of the search results that match user's search value
            stringIndex = product.name.toLowerCase().indexOf(value);
            firstHalf = product.name.slice(0, stringIndex + value.length);
            secondHalf = product.name.slice(stringIndex + value.length);

            return (
              <ProductItem
                key={product._id}
                style={{
                  backgroundColor: isSelected ? "lightgray" : "transparent",
                }}
                onMouseEnter={() => {
                  setSelectedSuggestionIndex(index);
                }}
                onClick={(e) => {
                  setValue(product.name);
                  navigate(`/itemDetail/${product._id}`);
                }}
              >
                <span>
                  {firstHalf}
                  <Prediction>{secondHalf}</Prediction>
                </span>
              </ProductItem>
            );
          })}
        </ProductList>
      )}
    </Wrapper>
  );
};
export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 10px;
`;

const Input = styled.input`
  height: 10px;
  width: 350px;
  border-radius: 30px;
  margin-right: 10px;
  border: none;
  outline: none;
  color: #343a40;
  background-color: white;
  border: 1px solid #343a40;
  padding: 20px 6px;
`;

const ProductList = styled.ul`
  position: absolute;
  top: 30px;
  border-radius: 20px;
  border: 1px lightgray solid;
  margin-top: 31px;
  padding: 0;
  background-color: white;
  z-index: 2;
`;

const ProductItem = styled.li`
  box-sizing: border-box;
  position: relative;
  padding: 10px;
  list-style-type: none;
  cursor: pointer;
`;

const Prediction = styled.span`
  font-weight: bold;
`;
