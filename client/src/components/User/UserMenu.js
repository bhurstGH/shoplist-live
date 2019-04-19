import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { userLogout } from "../../js/userHelpers";
import { Menu, MenuItem, Button } from "@material-ui/core";

function UserMenu(props) {
  const { user, setUser } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    const res = await userLogout(user, setUser);
    enqueueSnackbar(res.msg, { variant: res.variant });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        {user.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>Add Connections</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
};

export default UserMenu;
