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
    display: "flex",
    justifyContent: "center",
    top: "auto",
    bottom: 0
  },
  toolbar: {
    padding: 0
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
  const { classes, isShown, handleUnshow, socket, ...passProps } = props;

  const [shoppingList, setShoppingList] = useState();

  useEffect(() => {
    console.log(passProps);
  }, []);

  return (
    <React.Fragment>
      <Dialog fullScreen open={isShown} onClose={handleUnshow}>
        {/* <DialogTitle>{list.name}</DialogTitle> */}
        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton onClick={handleUnshow}>
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
            {/* <IconButton className={classes.button} onClick={handleUnshow}>
              <AddIcon />
            </IconButton>
            <IconButton className={classes.button} onClick={handleUnshow}>
              <PaymentIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>
      </Dialog>
    </React.Fragment>
  );
}

export default withStyles(styles)(ShoppingList);
