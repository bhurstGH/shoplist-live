export function checkListSuccess(err, list) {
  if (err) {
    console.log(err);
    return { msg: "List task failure", variant: "error", payload: err };
  }

  return {
    msg: `${list.name} with ${list.members.length} members saved to database`,
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

export function editList(socket, listId, editedList, callback) {
  socket.emit("EDIT_LIST", listId, editedList, (err, list) => {
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

export function deleteList(socket, listId) {
  socket.emit("DELETE_LIST", listId, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log(success);
    }
  });
}
