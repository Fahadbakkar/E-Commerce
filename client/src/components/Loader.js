import { FiLoader } from "react-icons/fi";
import styled from "styled-components";

//spinner for loading screens
const Loader = () => {
  return (
    <Div>
      <Spinner icon={FiLoader} size={40} />
    </Div>
  );
};

const Div = styled.div`
  padding-top: 355px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #0047b3;
  height: 85vh;
`;

const Spinner = styled(FiLoader)`
  animation-name: spin;
  animation-duration: 3000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
