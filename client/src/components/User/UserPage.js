import React, { useState } from "react";
import ShoppingLists from "../ShoppingList/ShoppingLists";

function UserPage(props) {
  const { user } = props;

  return (
    <div>
      <ShoppingLists user={user} />
    </div>
  );
}

export default UserPage;
