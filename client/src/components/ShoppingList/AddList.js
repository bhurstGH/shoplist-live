import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import ConnectionList from "../Connections/ConnectionList";
import { addNewList } from "../../js/listHelpers";

const styles = theme => ({});

function AddList(props) {
  const { classes, currentUser, socket, open, handleClose } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [listName, setListName] = useState("");
  const [members, setMembers] = useState([]);

  const handleChange = e => {
    setListName(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const listInfo = {
      userId: currentUser.id,
      name: listName,
      members
    };

    addNewList(socket, listInfo, (msg, variant) => {
      enqueueSnackbar(msg, { variant });
      if (variant === "success") {
        handleClose();
      }
    });
    // socket.emit("NEW_LIST", listInfo, (err, list) => {
    //   const { msg, variant } = checkListSuccess(err, list);
    //   enqueueSnackbar(msg, { variant });
    //   if (variant === "success") {
    //     setIsOpen(false);
    //   }
    // });
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New List</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="List Name"
              name="name"
              value={listName}
              onChange={handleChange}
              fullWidth
              required
            />
            {/* Delegates the member list out to
            user's connections */}
            <ConnectionList output={members} setOutput={setMembers} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

AddList.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired
};

export default withStyles(styles)(AddList);
