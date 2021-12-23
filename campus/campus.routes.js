module.exports = app => {
    const campus = require("./campus.controller");
    var router = require("express").Router();

    // -- Create a new campus
    router.post("/", campus.save);

    // -- To retrieve all campus
    router.get("/", campus.findAll);

    // -- To retrieve a campus
    router.get("/:campusId", campus.findOne);

    // -- To update a campus
    router.put("/:campusId", campus.update);

    // -- To add schools in campus
    router.post("/:campusId/schools", campus.addSchoolInCampus);

    // -- To delete a campus
    router.delete("/:campusId", campus.delete);

    // -- To add campus url 
    app.use("/schoolapi/api/v1/campus", router);
}