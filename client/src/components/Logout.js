import React from "react";
import { useSnackbar } from "notistack";
import { userLogout } from "../js/userHelpers";

const Logout = props => {
  const { children, setCurrentUser } = props;

  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    const { msg, variant } = await userLogout();
    enqueueSnackbar(msg, { variant });
    setCurrentUser(null);
    sessionStorage.clear();
  };

  return <div onClick={handleLogout}>{children}</div>;
};

export default Logout;
