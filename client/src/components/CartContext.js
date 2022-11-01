import { useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CartContext = createContext(null);

//Provides the context of a users cart to the rest of the app
const CartProvider = ({ children }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [amount, setAmount] = useState(0);

  //fetch cart based on the user's email
  useEffect(() => {
    if (user) {
      fetch(`/api/get-cart/` + user.email)
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setCart(data.result.cart);
            setLoaded(true);
          } else {
            googleUserHandle(data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  //posting new user to users db
  const googleUserHandle = (data) => {
    fetch("/api/new-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, cart: [] }),
    })
      .then(() => {
        setLoaded(true);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, loaded, amount, setAmount }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
