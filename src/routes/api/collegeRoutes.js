const express = require("express");
const Router = express.Router();
const collegeController = require("../../controllers/collegeController");

Router.post("/", collegeController.addCollege);
Router.get("/", collegeController.getColleges);
Router.get("/:id", collegeController.getCollegeData);

module.exports = Router;
