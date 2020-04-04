const router = require("express").Router();
const {
  landingController,
  authController,
  plaidController
} = require("./controllers");

router.use("/", landingController);
router.use("/user", authController);
router.use("/api", plaidController);

module.exports.router = router;