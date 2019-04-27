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
  InputBase
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
  grow: {
    flexGrow: 1
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing.unit * 2
  }
});

function ShoppingList(props) {
  const { classes, isShown, handleShow, socket, ...passProps } = props;

  const [shoppingList, setShoppingList] = useState();

  useEffect(() => {
    console.log(passProps);
  }, []);

  return (
    <React.Fragment>
      <Dialog fullScreen open={isShown} onClose={handleShow}>
        {/* <DialogTitle>{list.name}</DialogTitle> */}
        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton onClick={handleShow}>
              <ArrowBackIcon className={classes.contrastText} />
            </IconButton>
            <InputBase
              className={`${classes.contrastText} ${classes.grow}`}
              color="inherit"
              variant="outlined"
              placeholder="Add item..."
            />
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
