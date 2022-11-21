const router = require("express").Router();
const {
  loginHandler,
  registerHandler,
} = require("../controllers/auth.controllers");
const { validator } = require("../utils/middleware");
const { protectEd, getAll } = require("../controllers/main.controllers");
router.get("/", getAll);
router.post("/login", loginHandler);
router.post("/register", registerHandler);
router.get("/protected", validator, protectEd);
module.exports = router;
