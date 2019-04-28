require("dotenv").config();
const assert = require("assert").strict;
const User = require("../db/models/User");
const mongoose = require("mongoose");

describe("User model", () => {
  // newUser model baseline object
  let newUser = {
    name: "JohnDoe",
    email: "test@test.com",
    password: "password"
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

  it("should create and save new user document to database", done => {
    User.create(newUser)
      .then(user => {
        assert(!user.isNew);
        done();
      })
      .catch(err => console.log(err));
  });

  it("should return and read saved user details, password encrypted", done => {
    User.create(newUser)
      .then(saved => {
        User.findById(saved._id).then(user => {
          assert(user.name === newUser.name);
          assert(user.email === newUser.email);
          assert(user.password !== newUser.password);
          done();
        });
      })
      .catch(err => done());
  });

  it("should not create a user without an email", done => {
    User.create({ username: newUser.name, password: newUser.password })
      .then(res => console.log(res))
      .catch(err => assert(err.errors.email.message === "Email required."));
    done();
  });

  it("should not create a user without a password", done => {
    User.create({ email: newUser.email, username: newUser.name })
      .then(res => console.log(res))
      .catch(err =>
        assert(err.errors.password.message === "Password required.")
      );
    done();
  });

  describe("Validations", () => {
    it("Name should be at least six characters long", done => {
      let tooShort = { ...newUser, name: "short" };
      User.create(tooShort, err =>
        assert(err.message.indexOf("6 characters") !== -1)
      );
      done();
    });
  });

  it("Username should be no more than 25 characters long", done => {
    let tooLong = {
      ...newUser,
      name: "Definitely too long of a username"
    };
    User.create(tooLong, err =>
      assert(err.message.indexOf("25 characters") !== -1)
    );
    done();
  });

  it("Password should be at least six characters long", done => {
    let tooShort = { ...newUser, password: "short" };
    User.create(tooShort, err =>
      assert(err.message.indexOf("6 characters") !== -1)
    );
    done();
  });

  describe("Updating and deleting a user", () => {
    beforeEach(done => {
      User.create(newUser, err => {
        if (err) throw err;
        console.log("Creating test user");
        done();
      });
    });

    it("should find and update user's name", done => {
      User.findOneAndUpdate({ name: newUser.name }, { name: "JaneDoe" }).then(
        user => {
          User.findById(user._id)
            .then(updatedUser => {
              assert(user.name !== updatedUser.name);
              done();
            })
            .catch(err => done(err));
        }
      );
    });

    it("should find and delete the document", done => {
      User.deleteOne({ email: newUser.email })
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
