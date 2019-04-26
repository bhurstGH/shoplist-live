import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { userLogout } from "../js/userHelpers";

import { UserContext } from "../App";

function Logout(props) {
  const { children } = props;

  const [setCurrentUser] = useContext(UserContext);

  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    const { msg, variant } = await userLogout();
    enqueueSnackbar(msg, { variant });
    setCurrentUser(null);
    sessionStorage.clear();
  };

  return <div onClick={handleLogout}>{children}</div>;
}

export default Logout;
