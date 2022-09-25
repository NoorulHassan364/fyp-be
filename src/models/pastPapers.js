const mongoose = require("mongoose");
const pastPaperSchema = new mongoose.Schema(
    {
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        classSemester: {
            type: String,
            required: true,
        },
        instituteName: {
            type: String,
            required: true,
        },
        document: String,
        session: String
    }
);


const PastPaper = mongoose.model("PastPaper", pastPaperSchema);
module.exports = PastPaper;
