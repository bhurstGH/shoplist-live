import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Button } from "@material-ui/core";
import Logout from "../Logout";

function UserMenu(props) {
  const { children, currentUser, showAddConnectionWith } = props;

  const [anchorEl, setAnchorEl] = useState(null);

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
        <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.propTypes = {
  currentUser: PropTypes.object.isRequired
};

export default UserMenu;
