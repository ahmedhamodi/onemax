const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// bring in routes
const nominations = require("./routes/api/nominations");

// init app
const app = express();

// add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to database
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use("/api/nominations", nominations);

// listen to port
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening to port ${port}`));
