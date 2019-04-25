import React, { useState, useEffect, useRef, createContext } from "react";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Navbar from "./components/Navbar";
import UserPage from "./components/User/UserPage";
import Login from "./components/Login";
import Register from "./components/Register";
// import io from "socket.io-client";

// Keep the user stored in a globally accessible context
export const UserContext = createContext({});

function App() {
  // Open socket with useRef so that it persists through renders
  // const { current: socket } = useRef(io("http://localhost:5000/user"));

  // User hook for client side auth
  // Check session storage to persist user state
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

  // useEffect(() => {
  //   socket.open();
  //   socket.emit("CHECK_SESSION", data => {
  //     console.log(data);
  //   });

  //   return () => {
  //     socket.close();
  //   };
  // });

  // Toggle between Login and Register forms
  const [loginToggle, setLoginToggle] = useState(true);

  // If the user is logged, load user page
  // If not, load the login and/or register forms.
  const isLoggedIn = () => {
    if (currentUser) {
      return <UserPage currentUser={currentUser} />;
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
