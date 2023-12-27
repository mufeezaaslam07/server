const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authController.logout
);
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  authController.getUserData
);

module.exports = router;
