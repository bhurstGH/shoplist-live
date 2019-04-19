import axios from "axios";

export function userLogin(userInput, setUser) {
  return axios
    .post("/users/login", userInput)
    .then(res => {
      setUser({
        name: res.data.name,
        email: res.data.email,
        id: res.data._id
      });
      return { msg: "Login Success", variant: "success" };
    })
    .catch(err => {
      console.log(err.response);
      return { msg: "Login failure", variant: "error" };
    });
}
export function userLogout(user, setUser) {
  return axios
    .get("/users/logout")
    .then(res => {
      setUser(res.data.user);
      return { msg: "Logged out", variant: "warning" };
    })
    .catch(err => {
      console.log(err.response);
      return { msg: "Logout failed", variant: "error" };
    });
}
