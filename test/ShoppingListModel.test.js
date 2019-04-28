require("dotenv").config();
const assert = require("assert").strict;
const User = require("../db/models/User");
const ShoppingList = require("../db/models/ShoppingList");
const mongoose = require("mongoose");

describe("ShoppingList model", () => {
  // newUser model baseline object
  let newUser = {
    name: "JohnDoe",
    email: "test@test.com",
    password: "password"
  };

  let newList = {
    name: "Groceries"
  };

  const { collectionName } = User.collection;

  before(done => {
    mongoose.Promise = global.Promise;

    mongoose
      .connect(process.env.MONGO_TEST, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("Test DB connected");
        done();
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        done();
      });
  });

  beforeEach(done => {
    mongoose.connection.dropCollection(collectionName, () => {
      console.log("Collection cleared.");
      done();
    });
  });

  it("should create and save new shopping list document to database", done => {
    ShoppingList.create(newList)
      .then(list => {
        assert(!list.isNew);
        done();
      })
      .catch(err => console.log(err));
  });

  describe("Updating and deleting a list", () => {
    beforeEach(done => {
      ShoppingList.create(newList, err => {
        if (err) throw err;
        console.log("Creating test list");
        done();
      });
    });

    it("should find and update list's name", done => {
      ShoppingList.findOneAndUpdate(
        { name: newList.name },
        { name: "Clothing" }
      ).then(list => {
        ShoppingList.findById(list._id)
          .then(updatedList => {
            assert(list.name !== updatedList.name);
            done();
          })
          .catch(err => done(err));
      });
    });

    it("should find and delete the document", done => {
      ShoppingList.deleteOne({ name: newList.name })
        .then(res => {
          assert(res.deletedCount === 1);
          done();
        })
        .catch(err => done(err));
    });
  });

  after(done => {
    mongoose.connection.close(() => {
      console.log(`MongoDB disconnected`);
      done();
    });
  });
});
