import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

const styles = theme => ({});

function ShoppingItem(props) {
  const { socket, item, listId } = props;

  const [carted, setCarted] = useState(item.inCart);

  useEffect(() => {
    socket.on("UPDATE_CART", (cartStatus, itemId) => {
      if (itemId === item._id) {
        console.log("updating cart");
        setCarted(cartStatus);
      }
    });
  });

  const handleDelete = e => {
    deleteItem(socket, listId, item._id);
  };

  const handleCarting = () => {
    // setCarted(true);
    addToCart(socket, listId, item._id);
  };
  const handleUncarting = () => {
    // setCarted(false);
    removeFromCart(socket, listId, item._id);
  };

  return (
    <Paper>
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
        <ListItemText primary={item.name} />
        <ListItemSecondaryAction>
          <IconButton onClick={e => handleDelete(e)}>
            <DeleteForever />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
}

ShoppingItem.propTypes = {
  socket: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  listId: PropTypes.string.isRequired
};

export default withStyles(styles)(ShoppingItem);
