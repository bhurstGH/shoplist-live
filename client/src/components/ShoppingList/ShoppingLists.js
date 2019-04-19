import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import AddButtonList from "./AddListButton";

const styles = theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up("sm")]: {
      width: 420,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

function ShoppingLists(props) {
  const { classes, user } = props;

  return (
    <Paper className={classes.paper}>
      <AddButtonList user={user} />
    </Paper>
  );
}

ShoppingLists.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default withStyles(styles)(ShoppingLists);
