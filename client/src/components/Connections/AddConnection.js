import React, { useState } from "react";
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
import { ShowDialog } from "../util/ShowDialog";

function AddConnection(props) {
  const { children } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, setIsOpen] = useState(false);

  const [connection, setEmailConnection] = useState({ email: "" });

  const handleSubmit = async e => {
    e.preventDefault();
    const { msg, variant } = await connectionAdd(connection);
    enqueueSnackbar(msg, { variant });
    setEmailConnection({ email: "" });
    if (variant === "success") {
      setIsOpen(false);
    }
  };

  const handleChange = e => {
    setEmailConnection({ [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <ShowDialog openDialog={setIsOpen}>{children}</ShowDialog>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
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
            <Button onClick={() => setIsOpen(false)} color="primary">
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

export default AddConnection;
