const express = require("express");
const router = express.Router();

const ShoppingList = require("../models/ShoppingList");

router.post("/lists", (req, res) => {
  const { name, members } = req.body;

  members.push(req.user._id);

  ShoppingList.create({
    name: name,
    members: members
  })
    .then(list => {
      console.log(`${list} CREATED`);
      res.status(200).json(list);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ msg: err });
    });
});

router.get("/lists", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.json({ msg: "Must be logged in to retrieve lists" });
  }

  ShoppingList.find({ members: {} });
});

module.exports = router;
