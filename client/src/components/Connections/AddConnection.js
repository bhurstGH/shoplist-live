import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";
import { connectionAdd } from "../../js/connectionHelpers";

function AddConnection(props) {
  const { isShown, handleUnshow } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [connection, setEmailConnection] = useState({ email: "" });

  const handleSubmit = async e => {
    e.preventDefault();
    const { msg, variant } = await connectionAdd(connection);
    enqueueSnackbar(msg, { variant });
    setEmailConnection({ email: "" });
    if (variant === "success") {
      handleUnshow();
    }
  };

  const handleChange = e => {
    setEmailConnection({ [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <Dialog open={isShown} onClose={handleUnshow}>
        <DialogTitle>Add connections to share lists</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              id="email"
              label="Email"
              name="email"
              value={connection.email}
              onChange={handleChange}
              helperText="Email address of connection"
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUnshow} color="primary">
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

AddConnection.propTypes = {
  isShown: PropTypes.bool.isRequired,
  handleUnshow: PropTypes.func.isRequired
};

export default AddConnection;
