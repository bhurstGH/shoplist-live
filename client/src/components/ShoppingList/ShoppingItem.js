import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, TextField, Typography, Checkbox } from "@material-ui/core";

const styles = theme => ({
  paper: {
    display: "flex",
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up("sm")]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

function ShoppingItem(props) {
  const { classes, item } = props;

  const [carted, setCarted] = useState(false);
  const [itemName, setItemName] = useState("");

  const handleChange = e => {
    setItemName(e.target.value);
  };

  return (
    <Paper className={classes.paper}>
      <Typography>{item.name}</Typography>
      <Checkbox checked={carted} onChange={() => setCarted(prev => !prev)} />
    </Paper>
  );
}

export default withStyles(styles)(ShoppingItem);
