import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import CartProvider from "./components/CartContext";
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-t47hswxr.us.auth0.com"
      clientId="foFKyDN4eV9cvv1Vi0wNBNBxVs7kcCNN"
      redirectUri={window.location.origin}
      audience="https://dev-t47hswxr.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <CartProvider>
        <App />
      </CartProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
