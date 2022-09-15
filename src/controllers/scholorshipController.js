const Scholorship = require("../models/scholoshipModel");
const User = require("../models/user");
const College = require("../models/collgeModel");

exports.addScholorship = async (req, res) => {
    try {
        let user = await User.findById(req.body.user);
        let college = await College.findOne({ user: user?._id });
        req.body.collegeId = college?._id
        req.body.instituteName = college?.name
        let scholorship = await Scholorship.create(req.body);
        res.status(201).json({
            status: "success",
            data: scholorship
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.getScholorships = async (req, res) => {
    try {
        let scholorships = await Scholorship.find({});
        res.status(201).json({
            status: "success",
            data: scholorships
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.getInstituteScholorships = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        let college = await College.findOne({ user: user?._id });
        let scholorships = await Scholorship.find({ collegeId: college?._id });
        res.status(201).json({
            status: "success",
            data: scholorships
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.updateInstituteScholorships = async (req, res) => {
    try {
        let scholorship = await Scholorship.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            status: "success",
            data: scholorship
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.deleteInstituteScholorships = async (req, res) => {
    try {
        let scholorship = await Scholorship.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            data: scholorship
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.applyToScholorship = async (req, res) => {
    try {
        let user = await User.findById(req.params.userId);
        let scholorship = await Scholorship.findByIdAndUpdate(req.params.id, {
            $push: {
                applications: {
                    userId: user?._id,
                    name: `${user?.firstName} ${user?.firstName}`,
                    phone: user?.phone,
                    email: user?.email,
                    address: user?.address
                }
            }
        }, { new: true });
        res.status(201).json({
            status: "success",
            data: scholorship
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}