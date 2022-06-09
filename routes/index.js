// dependency
const express = require("express");
const notesAPI = require("./notesAPI");

const app = express();

// current uri is /api
// routing user to uri that handles api calls/response
app.use("/", notesAPI);

module.exports = app;
