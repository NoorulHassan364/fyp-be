const express = require("express");
const Router = express.Router();
const scholorshipController = require("../../controllers/scholorshipController");

Router.post("/", scholorshipController.addScholorship);
Router.get("/", scholorshipController.getScholorships);
Router.patch("/:id", scholorshipController.updateInstituteScholorships);
Router.delete("/:id", scholorshipController.deleteInstituteScholorships);
Router.get("/college/:id", scholorshipController.getInstituteScholorships);


module.exports = Router;
