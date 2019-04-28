import React from "react";
import ReactDOM from "react-dom";
import AddConnection from "./AddConnection";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddConnection />, div);
  ReactDOM.unmountComponentAtNode(div);
});
