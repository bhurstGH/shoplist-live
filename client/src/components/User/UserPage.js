import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function UserPage() {
  const [loginToggle, setLoginToggle] = useState(true);

  return (
    <div>
      {loginToggle ? (
        <Login setLoginToggle={setLoginToggle} />
      ) : (
        <Register setLoginToggle={setLoginToggle} />
      )}
    </div>
  );
}

export default UserPage;
