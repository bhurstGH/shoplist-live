import React from "react";
import ReactDOM from "react-dom";
import ConnectionList from "./ConnectionList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ConnectionList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
