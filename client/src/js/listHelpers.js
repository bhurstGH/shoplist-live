import axios from "axios";

export function checkListSuccess(err, list) {
  if (err) {
    console.log(err);
    return { msg: "Failed to create list", variant: "error", payload: err };
  }

  return {
    msg: `Created ${list.name} with ${list.members.length} members`,
    variant: "success",
    payload: list
  };
}

export function addNewList(socket, newList, callback) {
  socket.emit("NEW_LIST", newList, (err, list) => {
    const { msg, variant, payload } = checkListSuccess(err, list);
    callback(msg, variant, payload);
  });
}

export function getLists(socket, userId, callback) {
  socket.emit("GET_LISTS", userId, (err, listPayload) => {
    callback(listPayload);
  });
}

// *******
//   return axios
//     .post("/lists", listInfo)
//     .then(res => {
//       return { msg: "List added", variant: "success" };
//     })
//     .catch(err => {
//       return { msg: err.response.data.msg, variant: "error" };
//     });
// *******

// export function getLists(setLists) {
//   axios
//     .get("/lists")
//     .then(res => {
//       console.log(res.data.lists);
//       setLists(res.data.lists);
//     })
//     .catch(err => {
//       setLists([]);
//     });
// }