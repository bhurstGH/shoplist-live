import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  TextField,
  List,
  Divider,
  Chip
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import PaymentIcon from "@material-ui/icons/Payment";
import ShoppingItem from "./ShoppingItem";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  textfield: {
    margin: theme.spacing.unit * 2
  },
  bottomAppBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    padding: 0,
    display: "flex",
    justifyContent: "flex-end"
  },
  contrastText: {
    color: theme.palette.primary.contrastText
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing.unit * 2
  }
});

function ShoppingList(props) {
  const { classes, isShown, handleShow, socket, passedProps, cbRef } = props;
  const { list } = passedProps;

  const [items, setItems] = useState(list.items);
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    socket.emit("OPEN_LIST", list._id);

    socket.on("LIST_OPEN", listPayload => {
      console.log(`List opened: ${listPayload}`);
    });

    socket.on("LIST_FAIL", err => {
      console.log(`List failure: ${err}`);
    });

    socket.on("ITEM_ADDED", res => {
      console.log("RES::::: " + res);
    });

    // Multiple options for receiving data
    console.log("passedProps:", passedProps);
    console.log(items);
    console.log("list:", list);
    console.log("cbRef:", cbRef);

    return () => {
      socket.emit("CLOSE_LIST", list);
    };
  }, []);

  const handleChange = e => {
    setItemName(e.target.value);
  };

  const addNewItem = () => {
    const newItem = {
      name: itemName,
      inCart: false,
      purchase: false,
      list: list._id
    };
    socket.emit("ADD_ITEM", newItem);
  };

  return (
    <React.Fragment>
      <Dialog fullScreen open={isShown} onClose={handleShow}>
        <DialogTitle>List: {list.name}</DialogTitle>
        <TextField
          className={classes.textfield}
          margin="normal"
          name="newItem"
          value={itemName}
          onChange={handleChange}
          placeholder="Enter new item. Submit with button below."
        />
        <List>
          <ShoppingItem />
        </List>
        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton onClick={handleShow}>
              <ArrowBackIcon className={classes.contrastText} />
            </IconButton>
            <Button
              className={classes.button}
              color="inherit"
              variant="outlined"
              onClick={addNewItem}
            >
              <AddIcon />
            </Button>
            <Button
              className={classes.button}
              color="inherit"
              variant="outlined"
              onClick={() => console.log(list)}
            >
              <PaymentIcon />
            </Button>
          </Toolbar>
        </AppBar>
      </Dialog>
    </React.Fragment>
  );
}

export default withStyles(styles)(ShoppingList);
