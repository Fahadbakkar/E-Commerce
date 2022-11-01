import { useEffect, useState } from "react";

//Form used to select the category filter, which is passed in state to Home
const Category = ({ value, setValue }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetch("api/categories")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
        setLoading(true);
      });
  }, []);

  let newArr = [...new Set(items)];
  newArr.push("All");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      {loading ? (
        <label>
          <select onChange={handleChange}>
            <option>Choose a category...</option>
            {newArr.length > 0 &&
              newArr.map((category) => {
                return <option value={category}>{category}</option>;
              })}
          </select>
        </label>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};
export default Category;
