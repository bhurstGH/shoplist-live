import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button } from "@material-ui/core";
import { UserContext } from "../../App";
import axios from "axios";

const styles = theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing.unit * 3,
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

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("/users/login", userInput)
      .then(res => {
        setCurrentUser({
          name: res.data.name,
          email: res.data.email,
          id: res.data._id
        });
        console.log("Login Success");
      })
      .catch(err => {
        console.log(err.response);
      });
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
          fullWidth
          required
          autoFocus={true}
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
          onChange={handleChange}
          margin="normal"
          autoComplete="off"
        />
        <Button
          className={classes.buttonMargin}
          type="submit"
          variant="contained"
          color="primary"
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
          Register
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
