import axios from "axios";

// Makes call to register user
// Toggles back to Login component
export function userRegister(userInput, setLoginToggle) {
  return axios
    .post("/users/register", userInput)
    .then(res => {
      setLoginToggle("true");
      return { msg: `Registered as ${res.data.name}`, variant: "success" };
    })
    .catch(err => {
      return { msg: err.response.data.msg, variant: "error" };
    });
}

// Makes call to log in
// Saves user to sessionStorage to persist state
export function userLogin(userInput, setCurrentUser) {
  return axios
    .post("/users/login", userInput)
    .then(res => {
      setCurrentUser({
        name: res.data.name,
        email: res.data.email,
        id: res.data.id
      });

      return { msg: `Logged in as ${res.data.name}`, variant: "success" };
    })
    .catch(err => {
      console.log(err);
      return { msg: err.response.data.msg, variant: "error" };
    });
}

// Makes call to logout
// Sets currentUser state to null
// Clears sessionStorage
export function userLogout(setCurrentUser) {
  return axios
    .get("/users/logout")
    .then(res => {
      setCurrentUser(null);
      return { msg: "Logged out", variant: "warning" };
    })
    .catch(err => {
      return { msg: "Logout failed", variant: "error" };
    });
}

export function getUser() {
  return axios
    .get("/user")
    .then()
    .catch();
}
