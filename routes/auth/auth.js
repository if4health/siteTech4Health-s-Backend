const express = require("express");
const passport = require("passport");
const router = express.Router();
const axios = require("axios");
const { ROOT, BASE_PATH } = process.env;
require("./config");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${BASE_PATH}/auth/success`,
    failureRedirect: `${BASE_PATH}/auth/failure`,
  })
);

router.get("/failure", (req, res) => {
  console.log("sera?");
  res.redirect(ROOT + "/unauthorized");
});

router.get("/success", async (req, res) => {
  const user = req.session.passport.user;
  console.log(ROOT + "/whiteList/" + user.email);
  const response = await axios.get(ROOT + "/whiteList/" + user.email);

  if (response.data.length === 0) {
    res.redirect(ROOT + "/unauthorized");
  } else {
    res.redirect(ROOT);
  }
});

module.exports = router;
