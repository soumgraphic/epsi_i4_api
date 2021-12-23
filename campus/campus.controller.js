const db = require("../config/db");
const schoolsController = require("../schools/schools.controller");

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

// -- To get a campus
exports.findOne = async (req, res) => {
    try{
        const campusQuerySnapshot = await db.collection("campus").doc(req.params.campusId).get();
        if(campusQuerySnapshot.data()) {
            res.status(200).json(campusQuerySnapshot.data());
        }
        res.status(404).send({"error": `Campus not found: ${req.params.campusId}`});
    } catch {
        res.status(500).send({"error": "Something went wrong"});
    }
}

// -- update campus
exports.update = async (req, res) => {
    await db.collection("campus").doc(req.params.campusId).set(req.body,{merge:true})
    .then(()=> res.json({"message": "Campus update successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}

// -- delete campus 
exports.delete = (req, res) => {
    db.collection("campus").doc(req.params.campusId).delete()
    .then(()=> res.status(204).send({"message": "Campus delete successfully"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}

exports.addSchoolInCampus = async (req, res) => {
    schoolsToAdd = [];

    req.body.forEach((schoolId) => {
        if (schoolsController.isExist(schoolId)) {
            schoolsToAdd.push(schoolId);
        } else {
            res.status(404).send({"error": `Problem to add school, it's not found: ${schoolId}`});
        }
    });

    await db.collection("campus").doc(req.params.campusId).set({
        schools: schoolsToAdd
    }, {merge:true})
    .then(()=> res.send({"message": "Campus update successfully with new schools"}))
    .catch((error)=> res.status(500).send({"error": "Something went wrong"}))
}