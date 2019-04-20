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
        id: res.data.id
      });
      console.log(res.data._id);
      sessionStorage.setItem("name", res.data.name);
      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem("id", res.data.id);
      return { msg: "Login Success", variant: "success" };
    })
    .catch(err => {
      return { msg: err.response.data.msg, variant: "error" };
    });
}

export function userLogout(setCurrentUser) {
  return axios
    .get("/users/logout")
    .then(res => {
      setCurrentUser(res.data);
      sessionStorage.clear();
      return { msg: "Logged out", variant: "warning" };
    })
    .catch(err => {
      return { msg: "Logout failed", variant: "error" };
    });
}
