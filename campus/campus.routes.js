module.exports = app => {
    const campus = require("./campus.controller");
    var router = require("express").Router();

    // -- Create a new campus
    router.post("/", campus.save);

    // -- To retrieve all campus
    router.get("/", campus.findAll);

    app.use("/schoolapi/api/v1/campus", router);
}