const express = require("express");
const notesAPI = require("./notesAPI");

const app = express();

app.use("/notes", notesAPI);

module.exports = app;
