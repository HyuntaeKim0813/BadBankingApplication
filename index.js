var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const e = require("express");

// Define your secret key for JWT
const secretKey = "your_secret_key_here"; // Replace with your actual secret key

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());

// create user account
app.get(
  `/account/create/:name/:email/:password/:generatedAccountNumber/:selectedCheckboxesStr`,
  function (req, res) {
    // check if account exists
    dal.find(req.params.email).then((users) => {
      // if user exists, return error message
      if (users.length > 0) {
        console.log("User already in exists");
        res.send("User already in exists");
      } else {
        // else create user
        dal
          .create(
            req.params.name,
            req.params.email,
            req.params.password,
            req.params.generatedAccountNumber,
            req.params.selectedCheckboxesStr
          )
          .then((user) => {
            console.log(user);
            res.send(user);
          });
      }
    });
  }
);

// login user and generate JWT token
app.get(`/account/login/:email/:password`, function (req, res) {
  const email = req.params.email;
  const password = req.params.password;

  // Check if the user exists and the password matches
  dal.find(email).then((user) => {
    if (user.length > 0 && user[0].password === password) {
      // User authentication succeeded
      const userData = {
        email: user[0].email,
        // Include any other user data you want in the token
      };

      // Generate a JWT token for the logged-in user
      const token = jwt.sign(userData, secretKey, { expiresIn: "15min" });

      // Set the token as a cookie in the response
      res.cookie("token", token);

      // Respond with a success message and the token
      res.json({ message: "Login successful", token });
    } else {
      // User authentication failed
      res
        .status(401)
        .json({ message: "Login failed: wrong email or password" });
    }
  });
});

// find user account
app.get(`/account/find/:email`, function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get(`/account/findOne/:email`, function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get(`/account/update/:email/:amount`, function (req, res) {
  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all accounts
app.get(`/account/all`, function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

const PORT = process.env.PORT || 3000;
var port = 3000;
app.listen(PORT);
console.log("Running on port: " + port);
