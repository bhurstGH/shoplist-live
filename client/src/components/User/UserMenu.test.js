import React from "react";
import ReactDOM from "react-dom";
import UserMenu from "./UserMenu";

const testObj = { test: "object" };
function testFunc() {}

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <UserMenu
      currentUser={testObj}
      setCurrentUser={testFunc}
      showAddConnectionWith={testFunc}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
