const router = require("express").Router();
const {
  loginHandler,
  registerHandler,
} = require("../controllers/auth.controllers");
const { protectEd, getAll } = require("../controllers/main.controllers");
const { validator } = require("../utils/middleware");
router.get("/", getAll);
router.post("/login", loginHandler);
router.post("/register", registerHandler);
router.get("/protected", protectEd);
module.exports = router;
