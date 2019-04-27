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
    if (err) {
      return console.log(err);
    }
    callback(listPayload);
  });
}

export function deleteList(socket, listId, callback) {
  socket.emit("DELETE_LIST", listId, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log(success);
    }
  });
}
