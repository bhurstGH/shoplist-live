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
  Divider,
  Collapse
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Clear from "@material-ui/icons/Clear";
import AddList from "./AddList";
import { getLists } from "../../js/listHelpers";
import io from "socket.io-client";

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

  const { current: socket } = useRef(
    io("http://localhost:5000/socketlists", { autoConnect: false })
  );

  const [lists, setLists] = useState([]);
  const [listExpanded, setListExpanded] = useState({});

  useEffect(() => {
    socket.open();

    getLists(socket, currentUser.id, setLists);
    // socket.emit("GET_LISTS", currentUser.id, (err, listPayload) => {
    //   setLists(listPayload);
    // });
    socket.on("NEW_LIST", listsPayload => {
      console.log(listsPayload);

      setLists(prevLists => [...prevLists, listsPayload]);
    });
    return () => {
      socket.close();
    };
  }, []);

  const deleteList = listId => {
    socket.emit("DELETE_LIST", listId);
    socket.emit("GET_LISTS", currentUser.id, (err, listPayload) => {
      setLists(listPayload);
    });
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.addButton}>
        <AddList currentUser={currentUser} socket={socket}>
          <Button variant="contained" color="primary" size="small">
            Add List
          </Button>
        </AddList>
      </div>
      <Divider />
      <List
        subheader={<ListSubheader>{currentUser.name}'s Lists</ListSubheader>}
      >
        {lists.map(list => (
          <ListItem key={list._id} button>
            <ListItemText
              primary={list.name}
              secondary={`${list.members.length} list members`}
            />
            <IconButton onClick={() => deleteList(list._id)}>
              <Clear />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

ShoppingLists.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object
};

export default withStyles(styles)(ShoppingLists);
