const express = require("express");
const router = express.Router();

const ShoppingList = require("../models/ShoppingList");
const User = require("../models/User");

module.exports = io => {
  const listsIO = io.of("/socketlists");

  listsIO.on("connection", socket => {
    // Create a new list
    socket.on("NEW_LIST", (listInfo, res) => {
      const { userId, name, members } = listInfo;

      members.push(userId);

      const newList = new ShoppingList({
        name,
        members
      });

      newList
        .save()
        .then(list => {
          console.log(`New list created: ${list.name}`);
          socket.emit("NEW_LIST", list);
          res(null, list);
        })
        .catch(err => {
          console.log(`Failed to create list: ${err}`);
          res(err, false);
        });
    });

    // *******
    //  Create and add a new list to DB
    // router.post("/lists", (req, res) => {
    //   const { name, members } = req.body;

    //   // Push list creator into list members
    //   members.push(req.user._id);

    //   ShoppingList.create({
    //     name,
    //     members
    //   })
    //     .then(list => {
    //       console.log(`New list created`);
    //       res.status(200).end();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       res.status(400).end();
    //     });
    // });
    // *******

    // Retrieve lists for logged in user

    socket.on("GET_LISTS", (userId, res) => {
      User.findById(userId)
        .getLists()
        .then(lists => {
          console.log("Lists retrieved");
          res(null, lists.lists);
        })
        .catch(err => {
          console.log("Failed to retrieve lists");
          res(err, false);
        });
    });

    // Delete list

    socket.on("DELETE_LIST", listId => {
      ShoppingList.findByIdAndDelete(listId)
        .then(list => {
          console.log(list);
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  return router;
};
