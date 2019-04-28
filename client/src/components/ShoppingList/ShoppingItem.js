import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  IconButton,
  Checkbox,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteForever from "@material-ui/icons/DeleteForever";

const styles = theme => ({
  paper: {
    [theme.breakpoints.up("sm")]: {
      backgroundColor: theme.palette.primary.light
    }
  }
});

function ShoppingItem(props) {
  const { classes, item } = props;

  const [carted, setCarted] = useState(false);
  const [itemName, setItemName] = useState(item.name);

  const handleChange = e => {
    setItemName(e.target.value);
  };

  const handleDelete = (e, listId) => {
    e.stopPropagation();
    // deleteList(socket, listId);
    // getLists(socket, currentUser.id, setLists);
  };

  return (
    <Paper className={classes.paper}>
      <ListItem>
        <Checkbox checked={carted} onChange={() => setCarted(prev => !prev)} />
        <ListItemText primary={itemName} secondary={"Person"} />
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
