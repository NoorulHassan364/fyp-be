const College = require("../models/collgeModel");

exports.addCollege = async (req, res) => {
    try {
        let college = await College.create(req.body);
        res.status(201).json({
            status: "success",
            data: college
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.getColleges = async (req, res) => {
    try {
        let colleges = await College.find({});
        res.status(201).json({
            status: "success",
            data: colleges
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.getCollegeData = async (req, res) => {
    try {
        let college = await College.findById(req.params.id);
        res.status(201).json({
            status: "success",
            data: college
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}