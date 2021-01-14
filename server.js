const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");

const app = express();
const cors = require("cors");

app.use(cors());

//Bodyparser Middleware

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB config
const db = require("./config/key").mongoURI;

// Connect to Mongo

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
