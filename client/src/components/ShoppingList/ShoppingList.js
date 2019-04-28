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
  Typography
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import PaymentIcon from "@material-ui/icons/Payment";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import ShoppingItem from "./ShoppingItem";

const styles = theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up("sm")]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    }
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
  backButton: {
    marginRight: theme.spacing.unit * 3
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing.unit * 2
  }
});

function ShoppingList(props) {
  const { classes, isShown, handleShow, passedProps } = props;
  const { list, socket } = passedProps;

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
    setItemName("");
  };

  return (
    <Paper className={classes.paper} open={isShown} onClose={handleShow}>
      <Typography>List: {list.name}</Typography>
      <TextField
        autoFocus
        fullWidth
        margin="normal"
        name="newItem"
        value={itemName}
        onChange={handleChange}
        placeholder="Enter new item. Submit with button below."
        onKeyDown={e => {
          if (e.keyCode === 13) addNewItem();
        }}
      />
      <List>
        {items.map(item => (
          <ShoppingItem
            key={item._id}
            socket={socket}
            item={item}
            listId={list._id}
          />
        ))}
      </List>

      <AppBar position="fixed" className={classes.bottomAppBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.backButton} onClick={handleShow}>
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
            <AddShoppingCart />
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
  );
}

ShoppingList.propTypes = {
  passedProps: PropTypes.object.isRequired,
  handleShow: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired
};

export default withStyles(styles)(ShoppingList);
