const express = require("express");
const router = express.Router();

const ShoppingList = require("../models/ShoppingList");
const User = require("../models/User");

module.exports = io => {
  const listsIO = io.of("/socketlists");

  listsIO.on("connection", socket => {
    console.log(`${socket.id} has connected to socketlists namespace`);
    // Create a new list
    socket.on("NEW_LIST", (listInfo, res) => {
      console.log("@@@@@@@@@@@@@");
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

    // Get list items

    socket.on("OPEN_LIST", (listId, res) => {
      socket.join(listId, () => {
        console.log(`${socket.id} joined room ${listId}`);
      });

      ShoppingList.findById(listId)
        .then(list => {
          console.log(list);
          res(null, list);
        })
        .catch(err => {
          console.log(err);
          res(err, null);
        });
    });

    socket.on("disconnect", () => console.log("User Disconnected"));
  });

  return router;
};
