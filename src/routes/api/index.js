const express = require("express");
const authRoutes = require("./authRoutes");
const collegeRoutes = require("./collegeRoutes");
const scholorshipRoutes = require("./scholorshipRoutes");

let router = express.Router();

router.use("/auth", authRoutes);
router.use("/college", collegeRoutes);
router.use("/scholorship", scholorshipRoutes);


module.exports = router;
