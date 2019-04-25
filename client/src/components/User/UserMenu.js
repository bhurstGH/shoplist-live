import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { userLogout } from "../../js/userHelpers";
import { Menu, MenuItem, Button } from "@material-ui/core";
import AddConnection from "../Connections/AddConnection";

function UserMenu(props) {
  const { currentUser, setCurrentUser } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    const { msg, variant } = await userLogout(setCurrentUser);
    enqueueSnackbar(msg, { variant });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        {currentUser.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <AddConnection>
          {/* Wrap MenuItem inside AddConnection.
          This ensures the entire element can be 
          clicked to open the dialog */}
          <MenuItem>Add Connections</MenuItem>
        </AddConnection>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.propTypes = {
  currentUser: PropTypes.object.isRequired,
  setCurrentUser: PropTypes.func.isRequired
};

export default UserMenu;