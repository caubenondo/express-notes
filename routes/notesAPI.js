const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
    readAndAppend,
    readFromFile,
    writeToFile,
} = require("../helpers/fsUtils");

notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = { title, text, note_id: uuidv4() };

        readAndAppend(newNote, "./db/db.json");

        const response = {
            status: "success",
            body: newNote,
        };

        res.json(response);
    } else {
        res.json("Error in posting note");
    }
});

notes.delete("/:note_id", (req, res) => {
    const del_id = req.params.note_id;
    console.log(del_id);
    readFromFile("./db/db.json")
        .then((data) => JSON.parse(data))
        .then((data) => {
            const remainNotes = data.filter((note) => note.note_id !== del_id);
            writeToFile("./db/db.json", remainNotes);
            console.log("delete stuff");
            res.json(`Note with id ${del_id} has been deleted 🚮`);
        });
});
module.exports = notes;
