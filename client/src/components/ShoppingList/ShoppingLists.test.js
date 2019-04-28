import React from "react";
import ReactDOM from "react-dom";
import ShoppingLists from "./ShoppingLists";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ShoppingLists />, div);
  ReactDOM.unmountComponentAtNode(div);
});
