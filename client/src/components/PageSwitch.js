import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

//Buttons for navigating between pages on home
const PageSwitch = ({ page, setPage, maxPage }) => {
  return (
    <Wrapper>
      <PageArrow
        onClick={(ev) => {
          if (page > 1) {
            //redirect to previous page
            setPage(page - 1);
          }
        }}
      >
        <FiChevronLeft />
      </PageArrow>
      <PageArrow
        onClick={(ev) => {
          if (page < maxPage) {
            //redirect to next page
            setPage(page + 1);
          }
        }}
      >
        <FiChevronRight />
      </PageArrow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  background-color: var(--color-card);
`;
const PageArrow = styled.button`
  color: black;
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

export default PageSwitch;
