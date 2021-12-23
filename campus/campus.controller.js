const db = require("../config/db")

// -- Create campus 
exports.save = (req, res) => {

    if(req.body.name === "" || req.body.address === "") {
        res.status(400).send({
            "error": "Veuillez remplir les champs requis"
        });
    }

    db.collection("campus").add({
        "name": req.body.name,
        "address": req.body.address,
    }).then(function(docRef) {
        let message = "Campus added successfully";
        db.collection("campus").doc(docRef.id).update({
            "uid": docRef.id
        });

        console.log(message);
        res.status(201).send({
            "message": message
        });
    }).catch(function (error) {
        let errorMessage = "Something went wrong :(";
        res.status(500).send({"error": errorMessage});
    });
}

// -- To get all campus
exports.findAll = async (req, res) => {
    try{
        const campusQuerySnapshot = await db.collection("campus").get();
        const campus = [];

        campusQuerySnapshot.forEach((doc) => {
            campus.push(doc.data());
        });

        res.status(200).json(campus);
    } catch {
        res.status(500).send({"error": "Something went wrong"});
    }
}