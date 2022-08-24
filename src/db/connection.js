const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/FYP", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB successfully connected!");
  })
  .catch((err) => {
    console.log(err);
  });
