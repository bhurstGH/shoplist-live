import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { Paper, TextField, Button } from "@material-ui/core";
import { userRegister } from "../js/userHelpers";

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

function Register(props) {
  const { classes, setLoginToggle } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: ""
  });

  const handleSubmit = e => {
    console.log("test");
    e.preventDefault();
    const { msg, variant } = userRegister(userInput, setLoginToggle);
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
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          required
          autoFocus={true}
          value={userInput.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          required
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
        />
        <TextField
          id="confirmpass"
          name="confirmpass"
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={userInput.confirmpass}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          className={classes.buttonMargin}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Register
        </Button>
        <Button
          className={classes.buttonMargin}
          color="primary"
          size="small"
          fullWidth
          onClick={() => setLoginToggle(true)}
        >
          Go to Login
        </Button>
      </form>
    </Paper>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  setLoginToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Register);
