import axios from "axios";

export function checkListSuccess(err, list) {
  if (err) {
    console.log(err);
    return { msg: "Failed to create list", variant: "error" };
  }
  console.log(list);
  return {
    msg: `Created ${list.name} with ${list.members.length} members`,
    variant: "success"
  };

  //   return axios
  //     .post("/lists", listInfo)
  //     .then(res => {
  //       return { msg: "List added", variant: "success" };
  //     })
  //     .catch(err => {
  //       return { msg: err.response.data.msg, variant: "error" };
  //     });
}

export function getLists(setLists) {
  //   axios
  //     .get("/lists")
  //     .then(res => {
  //       console.log(res.data.lists);
  //       setLists(res.data.lists);
  //     })
  //     .catch(err => {
  //       setLists([]);
  //     });
}
