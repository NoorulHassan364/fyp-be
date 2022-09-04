const express = require("express");
const Router = express.Router();
const collegeController = require("../../controllers/collegeController");
const { multerUploadS3 } = require("../../utils/multer");

Router.post("/", multerUploadS3.any(), collegeController.addCollege);
Router.get("/", collegeController.getColleges);
Router.patch("/:id", multerUploadS3.any(), collegeController.updateCollegeProfile);
Router.get("/:id", collegeController.getCollegeData);
Router.post("/favourites", collegeController.addCollegeToFavourite);
Router.get("/favourites/:userId", collegeController.getMyCollegeList);
Router.post("/favourites/remove", collegeController.removeCollegeToFavourite);
Router.patch("/addProgram/:id", collegeController.addCollegePrograms);
Router.patch("/updateProgram/:userId/:programId", collegeController.updateCollegeProgram);
Router.get("/getPrograms/:id", collegeController.getCollegePrograms);
Router.get("/getCollegeProfile/:id", collegeController.getCollegeProfile);
Router.patch("/deleteProgram/:id/", collegeController.deleteProgram);

module.exports = Router;
