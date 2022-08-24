const express = require("express");
const authRoutes = require("./authRoutes");
const collegeRoutes = require("./collegeRoutes");

let router = express.Router();

router.use("/auth", authRoutes);
router.use("/college", collegeRoutes);
// router.use("/user", userRoutes);


module.exports = router;
