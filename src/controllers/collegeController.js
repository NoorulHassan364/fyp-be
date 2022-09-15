const College = require("../models/collgeModel");
const User = require("../models/user");

exports.addCollege = async (req, res) => {
    try {
        if (req.files) {
            let img = req.files.find(el => el.fieldname == "photo")
            let pros = req.files.find(el => el.fieldname == "prospectus")
            if (img) {
                req.body.image = img?.location;
            }
            if (pros) {
                req.body.prospectus = pros?.location;
            }
        }

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


exports.addCollegeToFavourite = async (req, res) => {
    console.log("inside..")
    try {
        let favouriteCollege = await User.findByIdAndUpdate(req.body.userId, {
            $push: { favourites: req.body.college }
        }, { new: true }).select("favourites").populate([
            {
                path: "favourites",
            },
        ]);
        res.status(201).json({
            status: "success",
            data: favouriteCollege
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.getMyCollegeList = async (req, res) => {
    try {
        let favouriteCollege = await User.findById(req.params.userId).select("favourites").populate([
            {
                path: "favourites",
            },
        ]);;
        res.status(201).json({
            status: "success",
            data: favouriteCollege
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.removeCollegeToFavourite = async (req, res) => {
    try {
        let favouriteCollege = await User.findByIdAndUpdate(req.body.userId, {
            $pull: { favourites: { $in: [req.body.college] } }
        }, { new: true }).select("favourites").populate([
            {
                path: "favourites",
            },
        ]);;
        res.status(201).json({
            status: "success",
            data: favouriteCollege
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.addCollegePrograms = async (req, res) => {
    try {
        let program = await College.findOneAndUpdate({ user: req.params.id }, {
            $push: { degreeAndPrograms: req.body }
        }, { new: true })
        res.status(201).json({
            status: "success",
            data: program
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.updateCollegeProgram = async (req, res) => {
    try {
        console.log("req.body", req.body)
        let program = await College.updateOne({ user: req.params.userId, 'degreeAndPrograms._id': req.params.programId }, {
            '$set': {
                'degreeAndPrograms.$.subject': req.body.subject,
                'degreeAndPrograms.$.titles': req.body.titles
            }
        })
        res.status(201).json({
            status: "success",
            data: program
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.getCollegePrograms = async (req, res) => {
    console.log("inside..")
    try {
        let programs = await College.findOne({ user: req.params.id }).select("degreeAndPrograms")
        res.status(201).json({
            status: "success",
            data: programs
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.getCollegeProfile = async (req, res) => {
    try {
        let college = await College.findOne({ user: req.params.id });
        res.status(201).json({
            status: "success",
            data: college
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.updateCollegeProfile = async (req, res) => {
    try {
        if (req.files) {
            let img = req.files.find(el => el.fieldname == "photo")
            let pros = req.files.find(el => el.fieldname == "prospectus")
            if (img) {
                req.body.image = img?.location;
            }
            if (pros) {
                req.body.prospectus = pros?.location;
            }
        }
        console.log("req.body.image", req.body.image);
        let college = await College.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            status: "success",
            data: college
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

exports.deleteProgram = async (req, res) => {
    console.log("inside..")
    try {
        let program = await College.findOneAndUpdate({ user: req.params.id }, {
            $pull: { degreeAndPrograms: req.body }
        }, { new: true })
        res.status(201).json({
            status: "success",
            data: program
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}
