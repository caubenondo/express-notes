// dependencies and utility
const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
    readAndAppend,
    readFromFile,
    writeToFile,
} = require("../helpers/fsUtils");

// HANDLING GET METHOD CALL at website/api/notes
notes.get("/notes", (req, res) => {
    // retrieve data from database json file
    // then response back data to user's fetch call
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// HANDLING POST METHOD at website/api/notes
notes.post("/notes", (req, res) => {
    // extract the values of title and text from call request's body
    const { title, text } = req.body;
    // if title and text strings are represent,
    if (title && text) {
        // then craft a new note with unique id
        const newNote = { title, text, note_id: uuidv4() };
        // retrieve the data from db, append the new note to that data, then save the file back to db
        // let the UTIL js file handle that logic
        readAndAppend(newNote, "./db/db.json");

        // craft the success response obj to signal user that the file is added sucessfully
        const response = {
            status: "success",
            body: newNote,
        };

        res.json(response);
    } else {
        // if the request doesnt have body that fulfill the text and title string requirement,
        // let user know there is an error in the process
        res.json("Error in posting note");
    }
});

// HANDLE the DELETING call with specific note id
notes.delete("/notes/:note_id", (req, res) => {
    // grab the note id on URI of request call
    const del_id = req.params.note_id;
    // console.log(del_id);

    // first we need to retrieve data from database,
    // filter out the delete note by using its id
    readFromFile("./db/db.json")
        .then((data) => JSON.parse(data))
        .then((data) => {
            // only keep the notes that doesnt have the same note id
            const remainNotes = data.filter((note) => note.note_id !== del_id);
            // overwrite the database file with new array that doesnt have deleted note
            writeToFile("./db/db.json", remainNotes);
            // reponse and let user know the note is deleted
            res.json(`Note with id ${del_id} has been deleted 🚮`);
        });
});
module.exports = notes;
