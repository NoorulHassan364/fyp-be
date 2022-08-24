const mongoose = require("mongoose");
// const user = require("./userModel")
const collegeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        discription: {
            type: String,
            reuired: true,
        },
        location: String,
        image: {
            type: String,
            required: true,
        },
        allImages: [String],
        averageCost: {
            type: Number,
            required: true,
            // default: 4.5,
            // set: val => Math.round(val * 10) / 10 //4.666, 46.66, 47, 4.7 
        },
        avgGpa: {
            type: String,
        },
        graduates: {
            type: Number,
        },
        underGraduates: {
            type: Number,
        },
        totalStudents: {
            type: Number,
            required: true
        },
        totalTeachers: {
            type: Number,
            required: true
        },
        degreeAndPrograms: [
            {
                subject: {
                    type: String,
                },
                titles: [
                    {
                        name: String,
                    }
                ]
            }
        ],
    }
);

// collegeSchema.index({ fee: 1, ratingsAverage: -1 })
// collegeSchema.index({ slug: -1 })
// // virtual properties
// collegeSchema.virtual("weeklyRating").get(function () {
//   return this.ratingsQuantity / 7;
// });
// document middleware
// collegeSchema.pre("save", function (next) {
//   // this is the currently document that has to be saved
//   console.log(this);
//   next();
// });
// // query middleware
// collegeSchema.pre("find", function () {
//   this.find({ secretTour: { $ne: true } });
// });

// before creating and saving tour into DB finding guides documents with their ids and embedding / saving guides documents  along with tours documents but the drawback of this is when thour guide update his data e.g:email,name then we have to check wheather this guide is in our tour guides field if so then we have to also update here so we dont' gonna user this we use populate function inside the query middleware 

// collegeSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await user.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });


// populating guides field in tour model  
// collegeSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "guides",
//     select: '-__v -passwordChangedAt'
//   });
//   next();
// })

// // virtual populating 
// collegeSchema.virtual("reviews", {
//   ref: "Review",
//   foreignField: "tour",
//   localField: "_id"
// })

const College = mongoose.model("College", collegeSchema);
module.exports = College;
