const express = require("express");
const Router = express.Router();
const pastPaperController = require("../../controllers/pastPaperController");
const { multerUploadS3 } = require("../../utils/multer");

Router.post("/", multerUploadS3.any(), pastPaperController.addPastPaper);
Router.get("/", pastPaperController.getPastPapers);
Router.patch("/:id", multerUploadS3.any(), pastPaperController.updateInstitutePapers);
Router.delete("/:id", pastPaperController.deleteInstitutePastPapers);
Router.get("/college/:id", pastPaperController.getInstitutePastPapers);

module.exports = Router;
