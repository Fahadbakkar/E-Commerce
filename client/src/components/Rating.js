import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = () => {
  const randomValue = Math.floor(Math.random() * 6);
  return (
    <div>
      <span>
        <FaStar style={{ color: "#f8e325" }} />
      </span>
      <span>
        <FaStar style={{ color: "#f8e325" }} />
      </span>
      <span>
        <FaStar style={{ color: "#f8e325" }} />
      </span>
      <span>
        <FaStar style={{ color: "#f8e325" }} />
      </span>
      <span>
        <FaRegStar style={{ color: "#f8e325" }} />
      </span>
    </div>
  );
};

export default Rating;
