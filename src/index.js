// importing the dependencies
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("./database");

// defining the Express app
const app = express();

// define http port
const port = 3000;

app.use(express.json());

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

const userRoutes = require("./Routes/user");
app.use("/api/user", userRoutes);

// starting the server
app.listen(port, () => {
  console.log("listening on port 3000");
});
