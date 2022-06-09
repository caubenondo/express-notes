// Dependencies
const express = require("express");
const path = require("path");
const { send } = require("process");
const api = require("./routes/index");
const PORT = process.env.PORT || 3001;
const app = express();

//MIDDLEWARE
// for parsing JSON
app.use(express.json());
// grab param from uri
app.use(express.urlencoded({ extended: true }));
// routing to routes folder
app.use("/api", api);

// path to static pages in public folder
app.use(express.static("public"));

// direct to use the notes html page
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);
// redirect user back to landing page
app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🙉`)
);
