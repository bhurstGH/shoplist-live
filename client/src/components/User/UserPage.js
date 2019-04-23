import React from "react";
import ShoppingLists from "../ShoppingList/ShoppingLists";

function UserPage(props) {
  const { currentUser } = props;

  return (
    <div>
      <ShoppingLists currentUser={currentUser} />
    </div>
  );
}

export default UserPage;
