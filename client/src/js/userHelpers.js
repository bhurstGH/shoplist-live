import axios from "axios";

export function userRegister(userInput, setLoginToggle) {
  return axios
    .post("/users/register", userInput)
    .then(res => {
      setLoginToggle("true");
      return { msg: "Register Success", variant: "success" };
    })
    .catch(err => {
      return { msg: err.response.data.msg, variant: "error" };
    });
}

export function userLogin(userInput, setCurrentUser) {
  return axios
    .post("/users/login", userInput)
    .then(res => {
      setCurrentUser({
        name: res.data.name,
        email: res.data.email,
        id: res.data._id
      });
      return { msg: "Login Success", variant: "success" };
    })
    .catch(err => {
      return { msg: err.response.data.msg, variant: "error" };
    });
}

export function userLogout(user, setUser) {
  return axios
    .get("/users/logout")
    .then(res => {
      setUser(res.data);
      return { msg: "Logged out", variant: "warning" };
    })
    .catch(err => {
      return { msg: "Logout failed", variant: "error" };
    });
}
