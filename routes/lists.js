const express = require("express");
const router = express.Router();

const ShoppingList = require("../db/models/ShoppingList");
const User = require("../db/models/User");

module.exports = io => {
  const listsIO = io.of("/socketlists");

  listsIO.on("connection", socket => {
    console.log(`${socket.id} has connected to socketlists namespace`);

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
          socket.emit("UPDATE_LISTS", list);
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

    socket.on("EDIT_LIST", (listId, editedList, res) => {
      ShoppingList.findByIdAndUpdate(
        listId,
        {
          $set: { name: editedList.name, members: editedList.members }
        },
        { new: true }
      )
        .then(list => {
          console.log(`Edited list: ${list.name}`);
          socket.emit("UPDATE_LISTS", list);
          res(null, list);
        })
        .catch(err => {
          console.log(`Failed to edit list: ${err}`);
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

    // Open this list for active tracking

    socket.on("OPEN_LIST", listId => {
      socket.join(`${listId}`, () => {
        console.log(`${socket.id} joined room ${listId}`);
      });

      ShoppingList.findById(listId)
        .select("items")
        .then(list => {
          socket.emit("UPDATE_ITEMS", list);
        })
        .catch(err => {
          socket.emit("ERROR");
          console.log(err);
        });
    });

    socket.on("CLOSE_LIST", list => {
      socket.leave(list._id);
      console.log(`${socket.id} left room ${list._id}`);
    });

    socket.on("ADD_ITEM", newItem => {
      if (!newItem.name) {
        socket.emit("ERROR", "Item name is required");
      }
      ShoppingList.findById(newItem.list)
        .then(list => {
          list.items.push({ name: newItem.name });
          list.save();
          listsIO.to(list._id).emit("UPDATE_ITEMS", list);
        })
        .catch(err => {
          console.log(err);
        });
    });

    socket.on("DELETE_ITEM", (listId, itemId) => {
      ShoppingList.findById(listId)
        .then(list => {
          list.items.id(itemId).remove();
          list.save();
          listsIO.to(listId).emit("UPDATE_ITEMS", list);
        })
        .catch(err => {
          console.log(err);
        });
    });

    socket.on("CART_ITEM", (listId, itemId, res) => {
      ShoppingList.findById(listId)
        .then(list => {
          const item = list.items.id(itemId);
          console.log("HEHEHEHEHEHE" + item);
          item.inCart = true;
          list.save();
          listsIO.to(listId).emit("UPDATE_ITEMS", list);
        })
        .catch(err => {
          res(err, null);
        });
    });
    socket.on("UNCART_ITEM", (listId, itemId, res) => {
      ShoppingList.findById(listId)
        .then(list => {
          const item = list.items.id(itemId);
          console.log("HEHEHEHEHEHE" + item);
          item.inCart = false;
          list.save();
          listsIO.to(listId).emit("UPDATE_ITEMS", list);
        })
        .catch(err => {
          console.log(err + "HSHSHSHHSHS");
          res(err, null);
        });
    });

    socket.on("disconnect", () => console.log("User Disconnected"));
  });

  return router;
};
