import React, { useState, useEffect, createContext } from "react";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import UserPage from "./components/User/UserPage";
import Login from "./components/Login";
import Register from "./components/Register";
// import io from "socket.io-client";
=======
import ShoppingLists from "./components/ShoppingList/ShoppingLists";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
>>>>>>> dev

// Keep the user stored in a globally accessible context
export const UserContext = createContext({});

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = sessionStorage.length
      ? {
          name: sessionStorage.getItem("name"),
          email: sessionStorage.getItem("email"),
          id: sessionStorage.getItem("id")
        }
      : null;
    return storedUser;
  });

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem("name", currentUser.name);
      sessionStorage.setItem("email", currentUser.email);
      sessionStorage.setItem("id", currentUser.id);
    }
  }, [currentUser]);

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
