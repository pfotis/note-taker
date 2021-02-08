// LOAD DATA
const fs = require("fs");
const db = require('../db/db');

// ROUTING

module.exports = (app) => {

  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => res.json(db));

  // ---------------------------------------------------------------------------
  
  app.get("/api/notes", function(err, res) {
    try {
      notesData = fs.readFileSync("./db/db.json", "utf8");
      notesData = JSON.parse(notesData);
    } catch (err) {
      console.log("\n error (in app.get.catch):");
      console.log(error);
    }
    res.json(notesData);
  });

  app.post("/api/notes", function(req, res) {
    try {
      notesData = fs.readFileSync("./db/db.json", "utf8");
      console.log(notesData);
      notesData = JSON.parse(notesData);
      req.body.id = notesData.length;
      notesData.push(req.body); 
      notesData = JSON.stringify(notesData);
    
      fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
        if (err) 
          throw err;
      });

      res.json(JSON.parse(notesData));
  
      // error Handling
    } catch (err) {
      throw err;
      console.log(error);
    }
  });
}
