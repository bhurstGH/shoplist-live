import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const styles = theme => ({});

function Navbar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            ShopList Live
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
