const mongoose = require("mongoose");
// const user = require("./userModel")
const scholoshipSchema = new mongoose.Schema(
    {
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        instituteName: {
            type: String,
            required: true,
        },
        location: String,
        degree: String,
        price: {
            type: Number,
            required: true,
            // default: 4.5,
            // set: val => Math.round(val * 10) / 10 //4.666, 46.66, 47, 4.7 
        },
        minimumGpa: {
            type: String,
        },
        deadline: {
            type: String,
        },
        applications: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                name: {
                    type: String,
                },
                email: {
                    type: String,
                },
                phone: {
                    type: String,
                },
                address: {
                    type: String,
                },
            }
        ],
    }
);


const Scholorship = mongoose.model("Scholorship", scholoshipSchema);
module.exports = Scholorship;
