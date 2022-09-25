const PastPaperModel = require("../models/pastPapers");
const User = require("../models/user");
const College = require("../models/collgeModel");

exports.addPastPaper = async (req, res) => {
    try {
        let user = await User.findById(req.body.user);
        let college = await College.findOne({ user: user?._id });
        req.body.collegeId = college?._id
        req.body.instituteName = college?.name
        let doc = req.files?.find(el => el.fieldname == "document")
        if (doc) {
            req.body.document = doc?.location;
        }
        let pastPaper = await PastPaperModel.create(req.body);
        res.status(201).json({
            status: "success",
            data: pastPaper
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.getPastPapers = async (req, res) => {
    try {
        let pastPapers = await PastPaperModel.find({});
        res.status(201).json({
            status: "success",
            data: pastPapers
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.getInstitutePastPapers = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        let college = await College.findOne({ user: user?._id });
        let pastPapers = await PastPaperModel.find({ collegeId: college?._id });
        res.status(201).json({
            status: "success",
            data: pastPapers
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.updateInstitutePapers = async (req, res) => {
    try {
        let doc = req.files?.find(el => el.fieldname == "document")
        if (doc) {
            req.body.document = doc?.location;
        }
        let pastPaper = await PastPaperModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            status: "success",
            data: pastPaper
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.deleteInstitutePastPapers = async (req, res) => {
    try {
        let pastPaper = await PastPaperModel.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            data: pastPaper
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}
