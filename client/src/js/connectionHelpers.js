import axios from "axios";

export function connectionAdd(email) {
  return axios
    .post("/users/add-connection", email)
    .then(res => {
      return { msg: "Connection Success", variant: "success" };
    })
    .catch(err => {
      return { msg: err.response.data.msg, variant: "error" };
    });
}

export function getConnections(setConnections) {
  axios
    .get("/users/connections")
    .then(res => {
      console.log(res.data.connections);
      if (!res.data.connections) {
        return setConnections([]);
      }
      setConnections(res.data.connections);
    })
    .catch(err => {
      console.log(err);
      setConnections([]);
    });
}
