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
  InputBase,
  TextField,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import PaymentIcon from "@material-ui/icons/Payment";
import { openList } from "../../js/listHelpers";

const styles = theme => ({
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
  const { classes, isShown, handleShow, socket, passedProps } = props;
  const { list } = passedProps;

  const [shoppingList, setShoppingList] = useState();
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    openList(socket, list._id, setShoppingList);
  }, []);

  const handleChange = e => {
    setItemName({
      ...itemName,
      [e.target.name]: e.target.value
    });
  };

  return (
    <React.Fragment>
      <Dialog fullScreen open={isShown} onClose={handleShow}>
        <DialogTitle>{list.name}</DialogTitle>
        <List />
        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton onClick={handleShow}>
              <ArrowBackIcon className={classes.contrastText} />
            </IconButton>
            <Button
              className={classes.button}
              color="inherit"
              variant="outlined"
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
