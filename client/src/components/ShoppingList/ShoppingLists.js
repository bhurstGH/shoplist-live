import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  IconButton,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import AddList from "./AddList";
import { getLists, deleteList } from "../../js/listHelpers";
import io from "socket.io-client";
import ShoppingList from "./ShoppingList";
import useShowComponent from "../util/useShowComponent";

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
  addButton: {
    alignSelf: "flex-end",
    margin: theme.spacing.unit
  }
});

function ShoppingLists(props) {
  const { classes, currentUser } = props;

  const { current: socket } = useRef(io("/socketlists"));

  const [showAddList, showAddListWith] = useShowComponent(AddList);
  const [showShoppingList, showShoppingListWith] = useShowComponent(
    ShoppingList
  );

  const [lists, setLists] = useState([]);

  useEffect(() => {
    getLists(socket, currentUser.id, setLists);

    socket.on("NEW_LIST", listsPayload => {
      setLists(prevLists => [...prevLists, listsPayload]);
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleDelete = (e, listId) => {
    e.stopPropagation();
    deleteList(socket, listId);
    getLists(socket, currentUser.id, setLists);
  };

  const handleClick = list => {
    showShoppingListWith(null, { list });
  };
  return (
    <Paper className={classes.paper}>
      <div className={classes.addButton}>
        {showAddList({ currentUser, socket })}
        {showAddListWith(
          <Button variant="contained" color="primary" size="small">
            Add List
          </Button>
        )}
      </div>
      <Divider />
      <List
        subheader={<ListSubheader>{currentUser.name}'s Lists</ListSubheader>}
      >
        {lists.map(list => (
          <ListItem
            key={list._id}
            button
            onClick={() => showShoppingListWith(null)}
          >
            <ListItemText
              primary={list.name}
              secondary={`${list.members.length} list members`}
            />
            <IconButton onClick={e => handleDelete(e, list._id)}>
              <Clear />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {showShoppingList({ currentUser, socket })}
    </Paper>
  );
}

ShoppingLists.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object
};

export default withStyles(styles)(ShoppingLists);
