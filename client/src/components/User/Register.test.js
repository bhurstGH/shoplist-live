import React from "react";
import ReactDOM from "react-dom";
import Register from "./Register";

const testObj = { test: "object" };
function testFunc() {}

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Register classes={testObj} setLoginToggle={testFunc} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
