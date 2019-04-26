import React, { useState, useEffect, createContext } from "react";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Navbar from "./components/Navbar";
import ShoppingLists from "./components/ShoppingList/ShoppingLists";
import Login from "./components/Login";
import Register from "./components/Register";

// Keep the user stored in a globally accessible context
export const UserContext = createContext({});

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = {};
  });

  // Toggle between Login and Register forms
  const [loginToggle, setLoginToggle] = useState(true);

  // If the user is logged, load user page
  // If not, load the login and/or register forms.
  const isLoggedIn = () => {
    if (currentUser) {
      return <ShoppingLists currentUser={currentUser} />;
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
