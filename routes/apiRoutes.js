// LOAD DATA
const fs = require("fs");
const db = require('../db/db');

// ROUTING

module.exports = (app) => {

  let notesData = [];

  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => res.json(db));

  // ---------------------------------------------------------------------------
  
  app.get("/api/notes", function(err, res) {
    try {
      notesData = fs.readFileSync("./db/db.json", "utf8");
      notesData = JSON.parse(notesData);
    } catch (err) {
      console.log("\n error:");
      console.log(error);
    }
    res.json(notesData);
  });

  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    try {
      notesData = fs.readFileSync("./db/db.json", "utf8");
      notesData = JSON.parse(notesData);
      req.body.id = notesData.length;
      notesData.push(req.body); 
      notesData = JSON.stringify(notesData);
    
      fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
        if (err) 
          throw err;
      });

    res.json(JSON.parse(notesData));
    } catch (err) {
        throw err;
        console.log(error);
    }
  });

  // ---------------------------------------------------------------------------

  // Delete a note

app.delete("/api/notes/:id", function(req, res) {
  try {
    //  reads the json file
    notesData = fs.readFileSync("./db/db.json", "utf8");
    // parse the data to get an array of the objects
    notesData = JSON.parse(notesData);
    // delete the old note from the array on note objects
    notesData = notesData.filter(function(note) {
      return note.id != req.params.id;
    });
    // make it string(stringify)so you can write it to the file
    notesData = JSON.stringify(notesData);
    // write the new notes to the file
    fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
      // error handling
      if (err) throw err;
    });

    // change it back to an array of objects & send it back to the browser (client)
    res.send(JSON.parse(notesData));

    // error handling
  } catch (err) {
    throw err;
    console.log(err);
  }
});

}




