import React, { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Navbar from "./components/Navbar";
import UserPage from "./components/User/UserPage";
import Login from "./components/Login";
import Register from "./components/Register";
import axios from "axios";

// Keep the user stored in a globally accessible context
export const UserContext = createContext({});

const styles = theme => ({});

function App(props) {
  const { classes } = props;

  const [currentUser, setCurrentUser] = useState(null);
  // Toggle between Login and Register forms
  const [loginToggle, setLoginToggle] = useState(true);

  useEffect(() => {
    console.log(currentUser);
    axios
      .get("/user")
      .then(res => {
        if (res.data) {
          console.log(res.data.user);
          setCurrentUser({
            name: res.data.name,
            email: res.data.email,
            id: res.data._id
          });
        }
      })
      .catch(err => console.log(err.response.data));
  }, []);

  // If the user is logged, load user page
  // If not, load the login and/or register forms.
  const isLoggedIn = () => {
    if (currentUser) {
      return <UserPage user={currentUser} />;
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
          <Navbar user={currentUser} setUser={setCurrentUser} />
          {isLoggedIn()}
        </UserContext.Provider>
      </SnackbarProvider>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
