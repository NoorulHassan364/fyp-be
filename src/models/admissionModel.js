const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    dob: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    courseOfStudy: {
        type: String,
    },
    cninc: {
        type: String,
    },
    secondarySchool1: {
        type: String,
    },
    secondarySchool2: {
        type: String,
    },
    secodarySchollAdress1: {
        type: String,
    },
    secodarySchollAdress2: {
        type: String,
    },
    secodarySchollSession1: {
        type: String,
    },
    secodarySchollSession2: {
        type: String,
    },
    admissionFee: {
        type: Number,
    },
    paid: {
        type: false,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
