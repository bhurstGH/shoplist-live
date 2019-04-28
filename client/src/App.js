import React, { useState, useEffect, createContext } from "react";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Navbar from "./components/Navbar";
import ShoppingLists from "./components/ShoppingList/ShoppingLists";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import { getUser } from "./js/userHelpers";
import useShowComponent from "./components/util/useShowComponent";

// Keep the user stored in a globally accessible context
export const UserContext = createContext({});

function App() {
  const [currentUser, setCurrentUser] = useState(prevUser => {
    if (sessionStorage.length > 0) {
      const sessionUser = {
        name: sessionStorage.getItem("name"),
        email: sessionStorage.getItem("email"),
        id: sessionStorage.getItem("id")
      };
      return sessionUser;
    } else {
      return null;
    }
  });

  const [showShoppingList, showShoppingListWith] = useShowComponent(
    ShoppingList
  );

  useEffect(() => {
    getUser(setCurrentUser);
  }, []);

  // Toggle between Login and Register forms
  const [loginToggle, setLoginToggle] = useState(true);

  // If the user is logged, load user page
  // If not, load the login and/or register forms.
  const isLoggedIn = () => {
    if (currentUser) {
      return (
        showShoppingList({ currentUser }) || (
          <ShoppingLists
            currentUser={currentUser}
            showShoppingListWith={showShoppingListWith}
          />
        )
      );
    } else {
      return loginToggle ? (
        <Login setLoginToggle={setLoginToggle} />
      ) : (
        <Register setLoginToggle={setLoginToggle} />
      );
    }
  };

  return (
    <div>
      <CssBaseline />
      <SnackbarProvider dense maxSnack={3}>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
          {isLoggedIn()}
        </UserContext.Provider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
