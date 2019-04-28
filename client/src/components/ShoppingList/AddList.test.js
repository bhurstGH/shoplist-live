import React from "react";
import ReactDOM from "react-dom";
import AddList from "./AddList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
