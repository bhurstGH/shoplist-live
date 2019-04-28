require("dotenv").config();
const axios = require("axios");
const assert = require("assert").strict;
const User = require("../db/models/User");
const base = "http://localhost:5000/";

describe("User routes", () => {
  describe("POST /users", () => {
    it("should create a new user and log in", done => {
      const newUser = {
        name: "JohnDoe",
        email: "test@test.com",
        password: "asdasd"
      };

      axios
        .post(base, newUser)
        .then(res => {
          User.findById(res.user.data._id).then(user => {
            assert(user === newUser);
            done();
          });
        })
        .catch(err => done());

      axios
        .post(base, { email: newUser.email, password: newUser.password })
        .then(res => {
          assert(res.data.name === newUser.name);
          done();
        });
    });
  });
});
