import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import UserPage from "./components/User/UserPage";
import Navbar from "./components/Navbar";

// Keep the user stored in a globally accessible context
export const UserContext = createContext({});

const styles = theme => ({});

function App(props) {
  const { classes } = props;

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <CssBaseline />
      <SnackbarProvider maxStack={3}>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navbar />
          <UserPage />
        </UserContext.Provider>
      </SnackbarProvider>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
