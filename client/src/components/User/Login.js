import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { Paper, TextField, Button } from "@material-ui/core";
import { UserContext } from "../../App";
import { userLogin } from "../../js/userHelpers";

const styles = theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up("sm")]: {
      width: 420,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  buttonMargin: {
    marginTop: theme.spacing.unit
  }
});

function Login(props) {
  const { classes, setLoginToggle } = props;

  const { enqueueSnackbar } = useSnackbar();

  const { setCurrentUser } = useContext(UserContext);

  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const { msg, variant } = await userLogin(userInput, setCurrentUser);
    enqueueSnackbar(msg, { variant });
  };

  const handleChange = e => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          required
          autoFocus={true}
          value={userInput.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          required
          value={userInput.password}
          onChange={handleChange}
          margin="normal"
          autoComplete="off"
        />
        <Button
          className={classes.buttonMargin}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Login
        </Button>
        <Button
          className={classes.buttonMargin}
          color="primary"
          size="small"
          fullWidth
          onClick={() => setLoginToggle(false)}
        >
          Go to Register
        </Button>
      </form>
    </Paper>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  setLoginToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Login);
