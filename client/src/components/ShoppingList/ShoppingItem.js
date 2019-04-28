import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteForever from "@material-ui/icons/DeleteForever";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import { deleteItem, addToCart, removeFromCart } from "../../js/listHelpers";

const styles = theme => ({
  paper: {
    [theme.breakpoints.up("sm")]: {
      backgroundColor: theme.palette.primary.light
    }
  }
});

function ShoppingItem(props) {
  const { classes, socket, item, listId } = props;

  const [carted, setCarted] = useState(item.inCart);
  const [itemName, setItemName] = useState(item.name);

  const handleChange = e => {
    setItemName(e.target.value);
  };

  const handleDelete = e => {
    deleteItem(socket, listId, item._id);
  };

  const handleCarting = () => {
    setCarted(true);
    addToCart(socket, listId, item._id);
  };
  const handleUncarting = () => {
    setCarted(false);
    removeFromCart(socket, listId, item._id);
  };

  return (
    <Paper className={classes.paper}>
      <ListItem>
        {carted ? (
          <IconButton onClick={handleUncarting}>
            <ShoppingCart />
          </IconButton>
        ) : (
          <IconButton onClick={handleCarting}>
            <ShoppingCartOutlined />
          </IconButton>
        )}
        <ListItemText primary={itemName} />
        <ListItemSecondaryAction>
          <IconButton onClick={e => handleDelete(e)}>
            <DeleteForever />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
}

export default withStyles(styles)(ShoppingItem);
