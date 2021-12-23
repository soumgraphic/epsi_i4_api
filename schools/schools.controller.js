const db = require("../config/db")

// -- Create school 
exports.save = (req, res) => {

    if(req.body.name === "") {
        res.status(400).send({
            "error": "Le nom de l'école est requis"
        });
    }

    db.collection("schools").add({
        "name": req.body.name,
        "programs": req.body.programs,
    }).then(function(docRef) {
        let message = "School added successfully";
        db.collection("schools").doc(docRef.id).update({
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
        const schoolsQuerySnapshot = await db.collection("schools").get();
        const schools = [];

        schoolsQuerySnapshot.forEach((doc) => {
            schools.push(doc.data());
        });

        res.status(200).json(schools);
    } catch {
        res.status(500).send({"error": "Something went wrong"});
    }
}

// -- To get a school
exports.findOne = async (req, res) => {
    try{
        const schoolQuerySnapShot = await db.collection("schools").doc(req.params.schoolId).get();
        if(schoolQuerySnapShot.data()) {
            res.status(200).json(schoolQuerySnapShot.data());
        }
        res.status(404).send({"error": `School not found: ${req.params.schoolId}`});
    } catch {
        res.status(500).send({"error": "Something went wrong"});
    }
}

exports.isExist = async (schoolId) => {
    try{
        const schoolQuerySnapShot = await db.collection("schools").doc(schoolId).get();
        if(schoolQuerySnapShot.data()) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}