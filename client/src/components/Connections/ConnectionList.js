import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Select,
  Input,
  FormControl,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel
} from "@material-ui/core";
import { getConnections } from "../../js/connectionHelpers";

// Comonent that displays connections in a select menu with checkboxes
// Will feed selected connections as an array to parent
// output and setOutput props are the parent's useState hook

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 240
  },
  button: {
    alignSelf: "flex-end"
  }
});

function ConnectionList(props) {
  const { classes, output, setOutput } = props;

  const [connections, setConnections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Retrieve connections from database
  useEffect(() => {
    getConnections(setConnections);
  }, []);

  // Update parent's hooks
  const handleChange = e => {
    console.log(e.target.value);
    console.log(e.currentTarget);
    setOutput(e.target.value);
  };

  // Should eventually be refactored for more flexibility
  // Currently only outputs as an input text field
  return (
    <div className={classes.root}>
      <FormControl>
        <InputLabel htmlFor="select-connections">Connections</InputLabel>
        <Select
          multiple
          value={output}
          name="connections"
          input={<Input id="select-connections" />}
          renderValue={selected => `${selected.length} connections selected`}
          onChange={handleChange}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        >
          {connections.map(connection => (
            <MenuItem key={connection._id} value={connection._id}>
              <Checkbox checked={output.indexOf(connection._id) > -1} />
              <ListItemText
                primary={connection.name}
                secondary={connection.email}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

ConnectionList.propTypes = {
  output: PropTypes.array.isRequired,
  setOutput: PropTypes.func.isRequired
};

export default withStyles(styles)(ConnectionList);
