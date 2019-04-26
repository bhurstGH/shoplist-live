import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { userLogout } from "../../js/userHelpers";

function UserMenu(props) {
  const { currentUser, setCurrentUser, showAddConnectionWith } = props;

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
        <MenuItem
          onClick={() => showAddConnectionWith(null, () => setAnchorEl(null))}
        >
          Add Connection
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.propTypes = {
  currentUser: PropTypes.object.isRequired
};

export default UserMenu;
