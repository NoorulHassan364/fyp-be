const express = require("express");
const authRoutes = require("./authRoutes");
const collegeRoutes = require("./collegeRoutes");
const scholorshipRoutes = require("./scholorshipRoutes");
const admissionRoutes = require("./admissionRoutes");

let router = express.Router();

router.use("/auth", authRoutes);
router.use("/college", collegeRoutes);
router.use("/scholorship", scholorshipRoutes);
router.use("/admission", admissionRoutes);


module.exports = router;
