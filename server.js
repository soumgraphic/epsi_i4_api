const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/hello/:id", (req, res) => {
    if( req.params.id.trim() == "") {
        res.status(400).send({"error": "L'id est requis"});
    }

    db.collection("boc-users").add({
        "name": "Bonjour",
        "age": "18",
        "gender": "male"
    }).then(function(docRef){
        console.log("User added with success " + docRef.id )
    });
    res.send({
        "message": "Bonjour tout le monde ",
        "name": req.params.id,
        "title": "software manager at ARKEA"
    });
});

// -- API routes definitions
require("./campus/campus.routes")(app);
require("./schools/schools.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});