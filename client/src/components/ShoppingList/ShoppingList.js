import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  TextField,
  List,
  Typography,
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
  const { classes, isShown, handleShow, passedProps } = props;
  const { list, socket, setListsToggle } = passedProps;

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    socket.open();
    socket.emit("OPEN_LIST", list._id);

    socket.on("UPDATE_ITEMS", itemPayload => {
      console.log("Updating items...");
      setItems(itemPayload.items);
    });
    socket.on("SUCCESS", res => {
      console.log("Request successful");
    });
    socket.on("ERROR", res => {
      console.log("Error with request");
    });

    return () => {
      socket.emit("CLOSE_LIST", list);
      socket.close();
    };
  }, []);

  const handleChange = e => {
    setItemName(e.target.value);
  };

  const addNewItem = () => {
    const newItem = {
      name: itemName,
      list: list._id
    };
    socket.emit("ADD_ITEM", newItem);
  };

  return (
    <React.Fragment>
      <Paper open={isShown} onClose={handleShow}>
        <Typography>List: {list.name}</Typography>
        <TextField
          fullWidth
          className={classes.textfield}
          margin="normal"
          name="newItem"
          value={itemName}
          onChange={handleChange}
          placeholder="Enter new item. Submit with button below."
        />
        <List>
          {items.map(item => (
            <ShoppingItem key={item._id} item={item} />
          ))}
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
      </Paper>
    </React.Fragment>
  );
}

export default withStyles(styles)(ShoppingList);
