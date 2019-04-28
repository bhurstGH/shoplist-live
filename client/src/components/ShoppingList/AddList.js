import React, { useState, useEffect } from "react";
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
import ConnectionList from "../User/ConnectionList";
import { addNewList, editList } from "../../js/listHelpers";

const styles = theme => ({});

function AddList(props) {
  const { currentUser, socket, isShown, handleShow, passedProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [listName, setListName] = useState("");
  const [members, setMembers] = useState([]);
  const [isNewList, setIsNewList] = useState(true);

  useEffect(() => {
    if (passedProps.list) {
      setListName(passedProps.list.name);
      setIsNewList(false);
    }
  }, []);

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
    if (isNewList) {
      addNewList(socket, listInfo, (msg, variant) => {
        enqueueSnackbar(msg, { variant });
        if (variant === "success") {
          setListName("");
          setMembers([]);
          handleShow();
        }
      });
    } else {
      listInfo.members.push(currentUser.id);
      editList(socket, passedProps.list._id, listInfo, (msg, variant) => {
        enqueueSnackbar(msg, { variant });
        if (variant === "success") {
          setListName("");
          setMembers([]);
          handleShow();
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Dialog open={isShown} onClose={handleShow}>
        <DialogTitle>{isNewList ? "New List" : "Edit List"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              id="name"
              label="List Name"
              name="name"
              value={listName}
              onChange={handleChange}
              fullWidth
              required
            />
            <ConnectionList output={members} setOutput={setMembers} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleShow} color="primary">
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
  socket: PropTypes.object.isRequired,
  isShown: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired
};

export default withStyles(styles)(AddList);
