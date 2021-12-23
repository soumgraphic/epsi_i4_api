module.exports = app => {
    const school = require("./schools.controller");
    var router = require("express").Router();

    // -- Create a new campus
    router.post("/", school.save);

    // -- To retrieve all campus
    router.get("/", school.findAll);

    // -- To retrieve a school
    router.get("/:schoolId", school.findOne);

    app.use("/schoolapi/api/v1/schools", router);
}