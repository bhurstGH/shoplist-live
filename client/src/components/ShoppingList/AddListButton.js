import React, { useState, useContext } from "react";
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
import axios from "axios";

const styles = theme => ({});

function AddListButton(props) {
  const { classes, user } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [listInfo, setListInfo] = useState({
    name: "",
    members: []
  });

  const handleChange = e => {
    setListInfo({
      ...listInfo,
      [e.target.name]: e.target.value
    });
  };

  const submitList = () => {
    axios
      .post("/lists", listInfo)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        Add List
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>New List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="List Name"
            name="name"
            value={listInfo.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            id="members"
            label="Members (optional)"
            name="members"
            value={listInfo.members}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={submitList} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

AddListButton.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(AddListButton);
