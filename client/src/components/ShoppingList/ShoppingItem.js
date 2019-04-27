import React, { useState } from "react";
import {
  Paper,
  TextField,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

function ShoppingItem(props) {
  const { id, name, inCart, purchased } = props;

  const [inCart, setInCart] = useState(false);
  const [itemName, setItemName] = useState("");

  const handleChange = e => {
    setItemName(e.target.value);
  };

  return (
    <Paper>
          <Checkbox checked={() => setInCart(!inCart)} />

        <TextField name={id} value={}/>
    </Paper>
  );
}

export default ShoppingItem;
