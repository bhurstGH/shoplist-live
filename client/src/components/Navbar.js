import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import useShowComponent from "./util/useShowComponent";
import UserMenu from "../components/User/UserMenu";
import AddConnection from "./Connections/AddConnection";
import Logout from "./Logout";

const styles = theme => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1
  }
});

function Navbar(props) {
  const { classes, currentUser, setCurrentUser } = props;

  const [showAddConnection, showAddConnectionWith] = useShowComponent(
    AddConnection
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.grow} variant="h5" color="inherit">
            ShopList Live
          </Typography>
          {currentUser && (
            <UserMenu currentUser={currentUser} setCurrentUser={setCurrentUser}>
              {showAddConnectionWith("Add Connection")}
              <Logout setCurrentUser={setCurrentUser}>Logout</Logout>
            </UserMenu>
          )}
          {showAddConnection()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func
};

export default withStyles(styles)(Navbar);
