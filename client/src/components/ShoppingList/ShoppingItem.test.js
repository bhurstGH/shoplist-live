import React from "react";
import ReactDOM from "react-dom";
import ShoppingItem from "./ShoppingItem";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ShoppingItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
