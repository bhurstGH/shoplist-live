import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import UserMenu from "../components/User/UserMenu";

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
  const { classes, user, setUser } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.grow} variant="h5" color="inherit">
            ShopList Live
          </Typography>
          {user && <UserMenu user={user} setUser={setUser} />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func
};

export default withStyles(styles)(Navbar);
