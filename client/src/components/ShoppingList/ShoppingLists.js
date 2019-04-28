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
import Edit from "@material-ui/icons/Edit";
import DeleteForever from "@material-ui/icons/DeleteForever";
import AddList from "./AddList";
import { getLists, deleteList } from "../../js/listHelpers";
import io from "socket.io-client";
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
  const { classes, currentUser, showShoppingListWith } = props;

  // Necessary for passing the instance to other components
  const { current: socket } = useRef(
    io("/socketlists", {
      autoConnect: false,
      reconnection: true,
      rejectUnauthorized: false
    })
  );

  const [showAddList, showAddListWith] = useShowComponent(AddList);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    socket.open();
    getLists(socket, currentUser.id, setLists);

    socket.on("UPDATE_LISTS", listsPayload => {
      getLists(socket, currentUser.id, setLists);
    });

    return () => {
      socket.close(console.log("Disconnected"));
    };
  }, []);

  const handleDelete = (e, listId) => {
    e.stopPropagation();
    deleteList(socket, listId);
    getLists(socket, currentUser.id, setLists);
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
            onClick={() =>
              showShoppingListWith(null, sendProps => {
                sendProps({ list, socket });
              })
            }
          >
            <ListItemText
              primary={list.name}
              secondary={`${list.members.length} list members`}
            />

            <IconButton
              onClick={e => {
                e.stopPropagation();
                showAddListWith(null, sendProps => {
                  sendProps({ list });
                });
              }}
            >
              <Edit />
            </IconButton>

            <IconButton onClick={e => handleDelete(e, list._id)}>
              <DeleteForever />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

ShoppingLists.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  showShoppingListWith: PropTypes.func.isRequired
};

export default withStyles(styles)(ShoppingLists);
